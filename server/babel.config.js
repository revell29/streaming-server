// babel.config.js
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"],
};
