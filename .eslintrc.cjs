/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      files: [
        'src/**/*.ts',
        'src/**/*.tsx',
        'src/**/*.js',
        'src/**/*.jsx',
        'src/**/*.cjs',
        'src/**/*.mjs'
      ],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'default', format: [ 'camelCase' ] },

          { selector: 'variableLike', format: [ 'camelCase' ] },
          { selector: 'variable', format: [ 'camelCase', 'UPPER_CASE' ] },
          { selector: 'parameter', format: [ 'camelCase' ], leadingUnderscore: 'allow' },

          { selector: 'memberLike', format: [ 'camelCase' ] },
          { selector: 'memberLike', modifiers: [ 'private' ], format: [ 'camelCase' ], leadingUnderscore: 'require' },

          { selector: 'typeLike', format: [ 'PascalCase' ] },
          { selector: 'typeParameter', format: [ 'PascalCase' ], prefix: [ 'T' ] },

          { selector: 'interface', format: [ 'PascalCase' ], custom: { regex: '^I[A-Z]', match: true } }
        ],
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
            // 1. built-in node.js modules
              [ `^(${ require('module').builtinModules.join('|') })(/|$)` ],
              // 2.1. package that start without @
              // 2.2. package that start with @
              [ '^\\w', '^@\\w' ],
              // 3. @nestjs packages
              [ '^@nestjs\/' ],
              // 4. @kibibit packages
              [ '^@kibibit\/' ],
              // 5. Internal kibibit packages (inside this project)
              [ '^@kb-' ],
              // 6. Parent imports. Put `..` last.
              [ '^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$' ],
              // 7. Side effect imports.
              [ '^\\u0000' ]
            ]
          }
        ],
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'unused-imports/no-unused-imports': 'error'
      }
    },
    {
      files: [
        '*.ts',
        '*.tsx',
        '*.js',
        '*.jsx',
        '*.cjs',
        '*.mjs'
      ],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@stylistic/js/semi': [ 'error', 'always' ],
        '@stylistic/js/quotes': [ 'error', 'single', { 'avoidEscape': true } ],
        '@stylistic/js/comma-dangle': [ 'error', 'never' ],
        '@stylistic/js/object-curly-spacing': [ 'error', 'always' ],
        '@stylistic/js/no-multi-spaces': 'error',
        '@stylistic/js/no-multiple-empty-lines': 'error',
        '@stylistic/js/array-bracket-spacing': [ 'error', 'always' ],
        '@stylistic/js/arrow-spacing': 'error',
        '@stylistic/js/block-spacing': 'error',
        '@stylistic/js/semi-spacing': 'error',
        '@stylistic/js/indent': [ 'error', 2 ],
        '@stylistic/js/template-curly-spacing': [ 'error', 'always' ],
        '@stylistic/js/max-len': [
          'error', {
            'code': 80,
            'comments': 120,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true
          }
        ]
      }
    },
    {
      files: [ '*.html' ],
      parser: '@html-eslint/parser',
      extends: [ 'plugin:@html-eslint/recommended' ],
      rules: {
        '@html-eslint/attrs-newline': 'error',
        '@html-eslint/no-duplicate-attrs': 'error',
        '@html-eslint/indent': [ 'error', 2 ],
        '@html-eslint/lowercase': 'error',
        '@html-eslint/sort-attrs': [ 'error', {
          'priority': [ 'id', 'name', 'content', 'type', 'class' ]
        } ],
        '@html-eslint/require-button-type': 'error',
        '@html-eslint/no-obsolete-tags': 'error',
        '@html-eslint/no-duplicate-id': 'error',
        '@html-eslint/no-positive-tabindex': 'error',
        '@html-eslint/require-open-graph-protocol': 'error'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    '@stylistic/js',
    'unused-imports',
    'simple-import-sort',
    'import',
    '@html-eslint'
  ]
};
