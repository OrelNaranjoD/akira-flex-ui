#!/usr/bin/env node

/**
 * XLF Merge Script
 *
 * Merges all domain-specific messages.xlf files into a single consolidated XLF
 * with <target> tags for Spanish translations.
 *
 * - Reads all messages.xlf from locale/{domain}/ directories
 * - Merges units by ID (deduplicates)
 * - Preserves existing translations in <target> tags
 * - Adds [TRANSLATE] placeholder for untranslated units
 * - Removes obsolete units not present in source XLFs
 *
 * Usage: node xlf-merge.js
 */

const fs = require('fs')
const path = require('path')

const CONFIG = {
  sourceLocale: 'en-US',
  targetLocale: 'es',
  xlfInputDir: path.join(__dirname, '../locale'),
  xlfOutputFile: path.join(__dirname, '../locale/messages.es.xlf'),
  untranslatedPlaceholder: '[TRANSLATE]',
  includeNotes: false,
}

/**
 * Find all messages.xlf files recursively
 */
function findXlfFiles(dir) {
  const files = []

  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        scan(fullPath)
      } else if (entry.name === 'messages.xlf') {
        files.push(fullPath)
      }
    }
  }

  scan(dir)
  return files
}

/**
 * Parse XLF file and extract units
 */
function parseXlfFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const units = []

  const unitRegex = /<unit id="([^"]+)">([\s\S]*?)<\/unit>/g
  let match

  while ((match = unitRegex.exec(content)) !== null) {
    const unitId = match[1]
    const unitContent = match[2]

    const sourceMatch = /<source>([\s\S]*?)<\/source>/.exec(unitContent)
    const source = sourceMatch ? sourceMatch[1].trim() : ''

    const notesMatch = /<notes>([\s\S]*?)<\/notes>/.exec(unitContent)
    const notes = notesMatch ? notesMatch[1].trim() : null

    units.push({
      id: unitId,
      source,
      notes,
    })
  }

  return units
}

/**
 * Load existing translations from output XLF
 */
function loadExistingTranslations() {
  if (!fs.existsSync(CONFIG.xlfOutputFile)) {
    return {}
  }

  const content = fs.readFileSync(CONFIG.xlfOutputFile, 'utf-8')
  const translations = {}

  const unitRegex = /<unit id="([^"]+)">([\s\S]*?)<\/unit>/g
  let match

  while ((match = unitRegex.exec(content)) !== null) {
    const unitId = match[1]
    const unitContent = match[2]

    const targetMatch = /<target>([\s\S]*?)<\/target>/.exec(unitContent)
    if (targetMatch) {
      translations[unitId] = targetMatch[1].trim()
    }
  }

  return translations
}

/**
 * Merge all units from multiple XLF files
 */
function mergeUnits(xlfFiles) {
  const mergedUnits = {}

  for (const filePath of xlfFiles) {
    console.log(`📖 Reading: ${path.relative(CONFIG.xlfInputDir, filePath)}`)
    const units = parseXlfFile(filePath)

    for (const unit of units) {
      if (!mergedUnits[unit.id]) {
        mergedUnits[unit.id] = unit
      } else {
        if (unit.notes && mergedUnits[unit.id].notes) {
          mergedUnits[unit.id].notes += '\n' + unit.notes
        } else if (unit.notes) {
          mergedUnits[unit.id].notes = unit.notes
        }
      }
    }
  }

  return mergedUnits
}

/**
 * Generate merged XLF content
 */
function generateMergedXlf(mergedUnits, existingTranslations) {
  const sortedIds = Object.keys(mergedUnits).sort()
  let xliffContent = `<?xml version="1.0" encoding="UTF-8" ?>
<xliff version="2.0" xmlns="urn:oasis:names:tc:xliff:document:2.0" srcLang="${CONFIG.sourceLocale}" trgLang="${CONFIG.targetLocale}">
  <file id="ngi18n" original="ng.template">
`

  for (const unitId of sortedIds) {
    const unit = mergedUnits[unitId]
    const target = existingTranslations[unitId] || CONFIG.untranslatedPlaceholder

    xliffContent += `    <unit id="${unitId}">\n`

    if (CONFIG.includeNotes && unit.notes) {
      xliffContent += `      <notes>\n`
      xliffContent += `        ${unit.notes.replace(/\n/g, '\n        ')}\n`
      xliffContent += `      </notes>\n`
    }

    xliffContent += `      <segment>\n`
    xliffContent += `        <source>${unit.source}</source>\n`
    xliffContent += `        <target>${target}</target>\n`
    xliffContent += `      </segment>\n`
    xliffContent += `    </unit>\n`
  }

  xliffContent += `  </file>
</xliff>
`

  return xliffContent
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Scanning for XLF files...')
  const xlfFiles = findXlfFiles(CONFIG.xlfInputDir)

  if (xlfFiles.length === 0) {
    console.error('❌ No messages.xlf files found')
    process.exit(1)
  }

  console.log(`✅ Found ${xlfFiles.length} XLF file(s)\n`)

  console.log('📦 Loading existing translations...')
  const existingTranslations = loadExistingTranslations()
  console.log(`✅ Loaded ${Object.keys(existingTranslations).length} existing translation(s)\n`)

  console.log('🔀 Merging units...')
  const mergedUnits = mergeUnits(xlfFiles)
  console.log(`✅ Merged ${Object.keys(mergedUnits).length} unique unit(s)\n`)

  console.log('✍️  Generating merged XLF...')
  const xliffContent = generateMergedXlf(mergedUnits, existingTranslations)

  fs.writeFileSync(CONFIG.xlfOutputFile, xliffContent, 'utf-8')
  console.log(`✅ Written: ${path.relative(process.cwd(), CONFIG.xlfOutputFile)}`)

  const newUnits = Object.keys(mergedUnits).filter((id) => !existingTranslations[id])
  const translatedUnits = Object.keys(mergedUnits).filter((id) => existingTranslations[id])
  const removedUnits = Object.keys(existingTranslations).filter((id) => !mergedUnits[id])

  console.log('\n📊 Summary:')
  console.log(`   - Total units: ${Object.keys(mergedUnits).length}`)
  console.log(`   - Translated: ${translatedUnits.length}`)
  console.log(`   - Pending: ${newUnits.length}`)
  if (removedUnits.length > 0) {
    console.log(`   - Removed (obsolete): ${removedUnits.length}`)
  }

  console.log('\n✨ Done!')
}

main()
