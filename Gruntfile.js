module.exports = function(grunt) {

    grunt.initConfig({
        execute: {
            target: {
                src: ['main.js']
            }
        },

        watch: {
            files: ['main.js', 'tools.json', 'template.html'],
            tasks: ['execute']
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: 'build',
                    open: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['connect:server', 'watch']);
};