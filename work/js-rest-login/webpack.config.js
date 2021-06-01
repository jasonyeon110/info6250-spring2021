const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/item.js',
    devtool: 'source-map',
    output: {
        filename: 'item.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] },
                }
            }
        ],
    },
};