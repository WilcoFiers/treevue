module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! jQuery Treevue ' + 
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: [
                    'jquery.treevue.js',
                    'jquery.treevue.import.js',
                    'jquery.treevue.export.js'
                ],
                dest: 'jquery.treevue.min.js'
            }
        },
        jshint: {
            all: ['jquery.treevue.js',
                'jquery.treevue.import.js', 
                'jquery.treevue.export.js'],
            options: {
                'globals' : {
                    'jQuery' : true
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['jshint', 'uglify']);

};