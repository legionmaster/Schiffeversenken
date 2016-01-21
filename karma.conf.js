module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'src/**/*.js',
            'test/**/*.spec.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'src/**/*.js': ['browserify'],
            'test/**/*.spec.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify']
        },

        // define reporters, port, loglevel, browsers etc.
    });
};