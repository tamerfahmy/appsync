/**
 * This file is used to configure the grunt tool to zip the project for lambda function
 */
module.exports = function (grunt) {
    // Define a zip task
    grunt.initConfig({
        zip: {
            'dist/appsync-mutation-lambda.zip': [
                'node_modules/**',
                'src/**',
                'lambda.js',
                'package.json',
                'package-lock.json',
                'README.md'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-zip');
};