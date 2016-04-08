module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build_dir: 'dist',
        srcs:['src/**/*.js','!src/**/*.spec.js'],
        test_srcs:['src/**/*.spec.js'],
        all_srcs: 'src/**/*.js',
        file_name: '<%= pkg.name %>',
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
                separator: ';'
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
              screwIE8: true,
              
            },
            build: {
              files: {
                '<%= build_dir %>/<%= file_name %>.min.js': '<%= build_dir %>/<%= file_name %>.js'
              }
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
        

    });
    grunt.registerTask('build', ['clean','jshint','concat','uglify']);
    grunt.registerTask('default', ['build']);
};
