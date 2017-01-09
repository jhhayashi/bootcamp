module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // compile stylus into css
        stylus: {
            compile: {
                options: {},
                files: {
                    'public/stylesheets/style.css': 'app/stylesheets/style.styl'
                }
            }
        },

        // minify js
        uglify: {
            minify: {
                options: { reserveDOMProperties: true },
                files: [{
                    expand: true,
                    cwd: 'app/js',
                    src: '**/*.js',
                    dest: 'public/js',
                    ext: '.min.js'
                }]
            }
        },

        // watch for any updates and reload the page if so
        watch: {
            css: {
                files: ['gruntfile.js', 'app/stylesheets/*'],
                tasks: ['stylus'],
                options: { livereload: 10000 }
            },
            js: {
                files: ['gruntfile.js', 'app/js/*'],
                tasks: ['uglify'],
                options: { livereload: 10000 }
            },
            html: {
                files: ['app/views/*'],
                tasks: [],
                options: { livereload: 10000 }
            }
        }
    });

    // load tasks from node_modules
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // expose commands
    grunt.registerTask('default', ['stylus', 'uglify', 'watch']);
    grunt.registerTask('publish', ['stylus', 'uglify']);
};
