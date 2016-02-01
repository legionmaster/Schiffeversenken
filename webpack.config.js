module.exports = {
    entry: './src/main.js',
    output: {
        filename: './public/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    }
};