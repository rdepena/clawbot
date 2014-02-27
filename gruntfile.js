var files = [
    'gruntfile.js',
    'lib/*.js'
    ];
module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            files: files,
            tasks: ['jshint']
        },
        jshint: {
            // define the files to lint
            files: files,
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint']);
};