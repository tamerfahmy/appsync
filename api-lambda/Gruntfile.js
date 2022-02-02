module.exports = function (grunt) {
    // Define a zip task
    grunt.initConfig({
        zip: {
            'dist/appinfo-lambda.zip': [
                'node_modules/**',
                'src/*',
                'lambda.js',
                'package.json',
                'package-lock.json',
                'README.md'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-zip');
};