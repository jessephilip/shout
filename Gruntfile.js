module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/assets/scss',
                        src: ['*.scss'],
                        dest: 'public/assets/css',
                        ext: '.css'
                    }
                ]
            }
        },
        uglify: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/assets/javascript',
                        src: [
                            '*.js', '!*.min.js'
                        ],
                        dest: 'public/assets/minified',
                        ext: '.min.js'
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/assets/css',
                        src: [
                            '*.css', '!*.min.css'
                        ],
                        dest: 'public/assets/minified',
                        ext: '.min.css'
                    }
                ]
            }
        }
    });

    // Load the plugin that provides the "sass" task.
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'uglify', 'cssmin']);

};
