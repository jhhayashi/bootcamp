module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // compile stylus into css
        // TODO use the documentation at https://github.com/gruntjs/grunt-contrib-stylus
        // to complete the files object below in order to compile the stylus
        // into /public/stylesheets/style.css
        //
        // Then modify your template view in /app/views/template.pug to include
        // this css file as a stylesheet
        stylus: {
            compile: {
                options: {},
                files: {
                    // TODO
                }
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

    // expose commands
    grunt.registerTask('default', ['stylus', 'watch']);
    grunt.registerTask('publish', ['stylus']);
};
