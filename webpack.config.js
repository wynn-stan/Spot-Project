const path = require('path');

module.exports = {
    entry: './render.js',
    mode: "production",
    output: {
        filename: 'bundle.js',
        path: path.resolve('./view/public'),
        publicPath: "./view/public/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, 
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ] 
            }
        ]
    }
}