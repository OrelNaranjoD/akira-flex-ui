export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'refactor', 'test', 'style', 'perf'],
    ],
    'subject-empty': [0],
    'type-empty': [0],
  },
  ignores: [(commit) => commit.includes('Release v') || commit.includes('[skip ci]')],
}
