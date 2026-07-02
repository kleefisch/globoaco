import studio from '@sanity/eslint-config-studio'

export default [
  ...studio,
  {
    files: ['*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
]
