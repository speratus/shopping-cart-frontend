module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                sassDir: 'assets/sass',
                cssDir: 'public'
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', 'compass');
};