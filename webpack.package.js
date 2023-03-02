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
        "src/modal-window-controller": path.resolve(__dirname, "package", "bin", "classes", "DateConverter")
    },

    plugins: []
});

packageConfig.module.rules[1].use.options.configFile = "tsconfig.package.json";
module.exports = packageConfig;
