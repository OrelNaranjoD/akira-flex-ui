// @ts-check
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import angular from 'angular-eslint'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.angular/',
      'coverage/',
      'eslint.config.mjs',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2023,
      },
      ecmaVersion: 2023,
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  js.configs.recommended,

  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),

  ...angular.configs.tsRecommended.map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),

  prettierConfig,

  {
    files: ['**/*.ts'],
    plugins: {
      jsdoc: jsdocPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'prettier/prettier': 'error',
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/check-tag-names': 'warn',
      'jsdoc/check-types': 'warn',
      'jsdoc/require-description': 'error',
      'jsdoc/require-description-complete-sentence': 'warn',
      'jsdoc/empty-tags': 'error',
      'jsdoc/no-blank-blocks': 'error',
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
          exemptEmptyConstructors: true,
          exemptEmptyFunctions: false,
          checkConstructors: false,
        },
      ],
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
    },
  },

  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'src/test/**/*.ts'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jasmine,
        ...globals.jest,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-description': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
    },
  },

  {
    files: [
      '**/*.component.ts',
      '**/*.service.ts',
      '**/*.guard.ts',
      '**/*.interceptor.ts',
      '**/*.pipe.ts',
      '**/*.directive.ts',
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'jsdoc/require-description': 'error',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns-description': 'warn',
    },
  },

  ...angular.configs.templateRecommended.map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),
  ...angular.configs.templateAccessibility.map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),

  {
    files: ['**/*.html'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]
