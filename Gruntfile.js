module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build_dir: 'build',
        srcs:['src/**/*.js','!src/**/*.spec.js'],
        test_srcs:['src/**/*.spec.js'],
        all_srcs: 'src/**/*.js',
        file_name: '<%= pkg.name %>-<%= pkg.version %>',
        banner:
            '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n',
        clean: [
            '<%= build_dir %>'
        ],
        concat: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: [
                    '<%= srcs %>'
                ],
                dest: '<%= build_dir %>/<%= file_name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: '<%= build_dir %>/<%= file_name %>.js',
                dest: '<%= build_dir %>/<%= file_name %>.min.js'
            }
        },
        jshint: {
            src: [
                '<%= srcs %>'
            ],
            test: [
                '<%= test_srcs %>'
            ],
            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            }
        },
        karma: {
            options: {
                files: ['dependencies/angular/angular.js','dependencies/angular-mocks/angular-mocks.js','<%= all_srcs %>'],
                frameworks: [ 'jasmine' ],
                runnerPort: 9999,
                plugins: [ 'karma-jasmine', 'karma-phantomjs-launcher','karma-firefox-launcher' ]
            },
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            dev: {
                reporters: 'dots'
            }
        }

    });
    grunt.registerTask('build', ['clean','jshint','karma:continuous','concat','uglify']);
    grunt.registerTask('default', ['build']);
};