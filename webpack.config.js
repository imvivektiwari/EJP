const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    watch: true,
    mode:'production',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    }
};