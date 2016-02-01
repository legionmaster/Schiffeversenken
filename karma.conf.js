module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        files: [
            'test/**/*.spec.js'
        ],

        exclude: [
        ],

        browser: [
            'phantomjs'
        ],

        preprocessors: {
            'test/**/*.spec.js': ['webpack', 'sourcemap']
        },

        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.spec\.js$/,
                        include: /test/,
                        exclude: /(node_modules)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.js?$/,
                        include: /src/,
                        exclude: /(node_modules|test)/,
                        loader: 'babel-istanbul',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        include: /src/,
                        exclude: /(node_modules|test)/,
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
        },

        reporters: ['progress', 'coverage'],
        // define reporters, port, loglevel, browsers etc.
    });
};