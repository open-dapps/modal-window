const path = require("path");
const defaultConfig = require("./webpack.config.js");

const packageConfig = Object.assign(defaultConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "package", "dist"),
        filename: "[name].js",
        library: {
            name: "modal-window",
            type: "umd"
        },
        clean: true
    },

    entry: {
        lib: path.resolve(__dirname, "package", "modal-window"),
        "src/modal-window-controller": path.resolve(__dirname, "package", "src", "modal-window-controller.ts"),
        "src/ModalWindow/index": path.resolve(__dirname, "package", "src", "ModalWindow", "index.ts")
    },

    externals: {
        "mobx": {
            commonjs: "mobx",
            commonjs2: "mobx",
            amd: "mobx"
        },
        "mobx-react-lite": {
            commonjs: "mobx-react-lite",
            commonjs2: "mobx-react-lite",
            amd: "mobx-react-lite"
        },
        "react": {
            commonjs: "react",
            commonjs2: "react",
            amd: "react"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom"
        },
        "@knownout/lib": {
            commonjs: "@knownout/lib",
            commonjs2: "@knownout/lib",
            amd: "@knownout/lib"
        }
    }
});

packageConfig.module.rules[1].use.options.configFile = "tsconfig.package.json";
module.exports = packageConfig;
