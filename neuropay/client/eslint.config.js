import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

export default [
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    },

    ...pluginVue.configs['flat/essential'],
    ...vueTsEslintConfig(),

    {
        languageOptions: {
            ecmaVersion: 'latest',
        },
        rules: {
            semi: ['error', 'always'],
            'array-bracket-spacing': ['error'],
            'arrow-spacing': ['error'],
            'block-spacing': ['error'],
            'brace-style': 'error',
            'comma-spacing': [
                'error',
                {
                    before: false,
                    after: true,
                },
            ],
            'comma-dangle': ['error', 'always-multiline'],
            'comma-style': ['error', 'last'],
            curly: 'error',
            'default-param-last': ['error'],
            'dot-notation': ['error'],
            'eol-last': ['error', 'always'],
            'func-call-spacing': ['error'],
            indent: ['error', 4],
            'keyword-spacing': 'error',
            'key-spacing': [
                'error',
                {
                    singleLine: {
                        beforeColon: false,
                        afterColon: true,
                    },
                },
            ],
            'no-array-constructor': ['error'],
            'no-await-in-loop': ['error'],
            'no-constructor-return': ['error'],
            'no-duplicate-imports': ['error'],
            'no-extra-boolean-cast': ['error'],
            'no-extra-label': ['error'],
            'no-irregular-whitespace': 'error',
            'no-lone-blocks': ['error'],
            'no-lonely-if': ['error'],
            'no-mixed-spaces-and-tabs': 'error',
            'no-multi-spaces': ['error'],
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'no-prototype-builtins': 'off',
            'no-return-assign': ['error'],
            'no-trailing-spaces': ['error'],
            'no-unneeded-ternary': ['error'],
            'no-unreachable-loop': ['error'],
            'no-unsafe-optional-chaining': ['error'],
            'no-useless-computed-key': ['error'],
            'no-useless-rename': ['error'],
            'no-whitespace-before-property': ['error'],
            'nonblock-statement-body-position': ['error'],
            'object-curly-spacing': ['error', 'always'],
            'prefer-object-spread': ['error'],
            'space-before-blocks': 'error',
            'spaced-comment': ['error'],
            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                },
            ],
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: 'import',
                    next: 'export',
                },
            ],
        },
    },
];
