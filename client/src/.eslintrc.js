module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/strict",
        "plugin:import/recommended",
        "plugin:testing-library/react",
        "prettier",
    ],
    plugins: ["react", "react-hooks", "jsx-a11y", "import"],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx"],
            },
        },
        react: {
            version: "detect",
        },
    },
    rules: {
        "no-console": "error",
        "import/prefer-default-export": "off",
        quotes: ["error", "double", { avoidEscape: true }],
        indent: ["error", 4],
        semi: ["error", "always"],
        "no-trailing-spaces": 0,
        "keyword-spacing": 0,
        "no-unused-vars": 1,
        "no-multiple-empty-lines": 0,
        "space-before-function-paren": 0,
        "eol-last": 0,
    },
    overrides: [
        {
            files: ["**/__tests__/**/*", "**/*.{spec,test}.*"],
            env: {
                "jest/globals": true,
            },
            plugins: ["jest", "jest-dom", "testing-library"],
            extends: ["plugin:jest/recommended", "plugin:jest-dom/recommended", "plugin:testing-library/react"],
        },
    ],
};
