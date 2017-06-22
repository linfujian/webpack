var path = require('path');

module.exports = {
    entry: './app.jsx',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: '../../../../../api-view/api-view/src/main/webapp/resources/bundlebuilt/bundle.js'
        //filename: '../../../../../bookstore/src/main/webapp/resources/reactBundle/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader:'style!css!'
            }
        ]
    }
};
