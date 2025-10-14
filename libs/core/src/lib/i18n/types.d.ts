/**
 * Global type declarations for Angular localize.
 * This allows using $localize without explicit imports when the polyfill is configured.
 */
declare const $localize: (
  messageParts: TemplateStringsArray,
  ...expressions: readonly unknown[]
) => string
