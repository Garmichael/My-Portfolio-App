module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n',
                banner: '\'use strict\';\n\n'
            },
            javascript: {
                src: ['_source/**/**/*.js'],
                dest: 'public/lib/portfolio.js'
            }
        },
        less: {
            output: {
                options: {
                    paths: ['public/src/stylesheets'],
                    compress: true
                },
                files: {
                    'public/src/stylesheets/portfolio.css': '_source/LESS Styles/less_portfolio.less'
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'handlebarsTemplates',
                    amd: true,
                    partialsUseNamespace: true,
                    partialRegex: /.*/,
                    compilerOptions: {
                        knownHelpers: {
                            'iff': true,
                            'math': true,
                            'levelFromXp': true,
                            'xpToPie': true,
                            'xpRingProperties': true,
                            'levelRingProperties': true
                        },
                        knownHelpersOnly: true
                    }
                },
                files: {
                    "public/lib/compiled-templates.js": [
                        "_source/*.hbs",
                        "_source/**/*.hbs",
                        "_source/**/**/*.hbs",
                        "_source/**/**/**/*.hbs",
                        "_source/**/**/**/**/*.hbs"
                    ]
                }
            }
        },
        watch: {
            javascript: {
                files: [
                    '_source/*.js',
                    '_source/**/*.js',
                    '_source/**/**/*.js',
                    '_source/**/**/**/*.js',
                    '_source/**/**/**/**/*.js'
                ],
                tasks: ['concat']
            },
            less: {
                files: [
                    '_source/*.less',
                    '_source/**/*.less',
                    '_source/**/**/*.less',
                    '_source/**/**/**/*.less',
                    '_source/**/**/**/**/*.less'
                ],
                tasks: ['less']
            },
            handlebars: {
                files: [
                    '_source/*.hbs',
                    '_source/**/*.hbs',
                    '_source/**/**/*.hbs',
                    '_source/**/**/**/*.hbs',
                    '_source/**/**/**/**/*.hbs'
                ],
                tasks: ['handlebars']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.registerTask('default', ['watch']);

};
