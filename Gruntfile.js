'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    eslint: {
      options: {
        configFile: "eslintrc.json"
      },
      src: ['src/**/*.jsx', 'src/**/*.coffee']
    },
    babel: {
      options: {
        sourceMap: false,
        blacklist: ['strict']
      },
      dist: {
        files: [{
          "expand": true,
          "cwd": "src/",
          "src": ["**/*.jsx"],
          "dest": "build/babel/",
          "ext": ".js"
        }]
      }
    },
    cjsx: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'src/',
        src: ['*.cjsx'],
        dest: 'build/cjsx/',
        ext: '.js'
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['build/babel/*.js', 'build/cjsx/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      },
    },
    browserify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.js': ['build/<%= pkg.name %>.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= eslint.src %>',
        tasks: ['jshint:gruntfile']
      },
      test: {
        files: '<%= nodeunit.files %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-coffee-react');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("gruntify-eslint");

  // Tasks
  grunt.registerTask('default', ['eslint', 'babel', 'cjsx', 'concat', 'browserify']);
  grunt.registerTask('prod', ['default', 'uglify']);

};
