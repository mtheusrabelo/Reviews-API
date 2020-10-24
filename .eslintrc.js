module.exports = {
    extends: ['eslint-config-airbnb-base'],
    env: {
        node: true,
        commonjs: true,
        jest: true
    },
    parserOptions: {
        sourceType: 'script'
    },
    rules: {
        indent: [2, 4],
        'no-console': 'off',
        'comma-dangle': ['error', 'never'],
        'consistent-return': 'off',
        'no-await-in-loop': 'off'
    }
};
