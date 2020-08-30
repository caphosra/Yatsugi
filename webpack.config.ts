import { Configuration } from "webpack";
import * as path from "path";

const components: Configuration = {
    mode: "production",
    target: "electron-main",
    entry: path.join(__dirname, "src", "main"),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [{
            test: /.ts?$/,
            include: [
                path.resolve(__dirname, "src"),
            ],
            exclude: [
                path.resolve(__dirname, "node_modules"),
            ],
            loader: "ts-loader",
        }]
    }
};

const renderer: Configuration = {
    mode: "production",
    target: "electron-renderer",
    entry: path.join(__dirname, "src", "renderer", "main"),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist", "renderer")
    },
    resolve: {
        extensions: [".json", ".js", ".jsx", ".css", ".ts", ".tsx"]
    },
    module: {
        rules: [{
            test: /\.(tsx|ts)$/,
            include: [
                path.resolve(__dirname, "src")
            ],
            exclude: [
                path.resolve(__dirname, "node_modules")
            ],
            loader: "ts-loader"
        }]
    }
};

export default [
    components, renderer
];
