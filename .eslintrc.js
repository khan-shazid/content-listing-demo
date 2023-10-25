module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    parser:  '@typescript-eslint/parser',
    extends:  [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
        ecmaFeatures: {
            jsx:  true,
        },
    },
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    plugins: [
        'react'
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        // allow jsx syntax in js files (for next.js project)
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    },
    settings:  {
        react:  {
            version:  'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
}