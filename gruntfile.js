module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                sassDir: 'assets/sass/',
                cssDir: 'public/css/'
            }
        }
    })

    const { exec } = require('child_process');

    grunt.registerTask('tsc', 'runs the typescript compiler', function() {
        exec('tsc', (error, stdout, stderr) => {
            if (error) {
                grunt.log.error('There was an error running `tsc`');
                grunt.log.error(error.message);
            }

            if (stderr) {
                grunt.log.error('tsc failed to compile:');
                grunt.log.error(stderr);
            }
        });
    });

    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['compass', 'tsc']);
};