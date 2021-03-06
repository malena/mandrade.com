module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		watch: {
			options:{
				livereload: true,
			},
			scripts: {
				files: ['app/static/js/*.js'],
				tasks: ['uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: [
                        'app/static/css/index.styl', 
                        'app/static/css/settings.styl', 
                        'app/static/css/reset.styl', 
                        'app/static/css/base.styl',
                        'app/static/css/layout.styl',
                        'app/static/css/modal.styl',
                        'app/static/css/mobile-minimal.styl'
                        ],
				tasks: ['stylus'],
				options: {
					livereload: true,
					spawn: false
				}
			},
			html: {
				files: ['app/*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true,
					spawn: false
				}
			}
		},

		uglify : {
			build: {
				src: [
					'app/static/js/libs/jquery.superscrollorama.js', 
                    'app/static/js/libs/tweenmax.js', 
					'app/static/js/animations.js', 
					'app/static/js/project.js'
				],
				dest: 'public/dist/js/project.min.js' 
			}
		},

		stylus: {
			options: {
				compress: true
			},
			compile: {
				files: {
					'public/dist/css/project.min.css' : 'app/static/css/index.styl'
				}
			}
		},

		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'index.html' : 'app/index.jade',
                    'templates.html' : 'app/templates.jade'
				}
			}
		},

		connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 8800
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['connect', 'uglify', 'stylus', 'jade', 'watch']);

};
