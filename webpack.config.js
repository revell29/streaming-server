var webpack = require("webpack");
var path = require("path");
const dotenv = require("dotenv");

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

var APP_DIR = path.resolve(__dirname, "./webstream");

const config = {
    plugins: [new webpack.DefinePlugin(envKeys)],
    entry: {
        main: APP_DIR + "/index.js",
    },
    output: {
        path: path.resolve("./assets"),
        filename: "[name].js",
        publicPath: "/assets/",
    },
    module: {
        rules: [
            {
                test: /(\.css|.scss)$/,
                use: [
                    {
                        loader: "style-loader", // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.(jsx|js)?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            node: "10",
                                        },
                                    },
                                ],
                                "@babel/preset-react",
                            ], // Transpiles JSX and ES6
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = config;
