/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> */',

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      jsLibs: {
        src:
          [
            'node_modules/rownd/dist/rownd.js'
            // Add js libs here
          ],
        dest: 'dist/assets/js/project-libs.js'
      },
      app: {
        src: [
          'app/routes.js',
          'app/helpers/**/*.js',
          'app/controllers/**/*.js'
        ],
        dest: 'dist/assets/js/project-app.js'
      }
    },

    ractive: {
      template: {
        src: 'app/views/**/*.handlebars',
        dest: 'dist/assets/js/project-templates.js'
      }
    },

    copy: {
      index: {
        files: [{
          expand: true,
          cwd: 'app/',
          src: ['index.html'],
          dest: 'dist/'
        }]
      },
      ractiveMap: {
        files: [{
          expand: true,
          cwd: 'libs/ractive/',
          src: ['ractive.js.map'],
          dest: 'dist/assets/js/'
        }]
      },
      styles: {
        files: [{
          expand: true,
          cwd: 'app/styles/',
          src: ['**.css'],
          dest: 'dist/assets/css/'
        }]
      }
    },

    jshint: {
      options : {
        jshintrc : '.jshintrc'
      },
      beforeconcat: [
        'app/routes.js',
        'app/helpers/**/*.js',
        'app/controllers/**/*.js'
      ]
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      libs: {
        files: {
          'dist/assets/js/project-libs.js' : 'dist/assets/js/project-libs.js'
        }
      },
      app: {
        files: {
          'dist/assets/js/project-app.js' : 'dist/assets/js/project-app.js'
        }
      }
    },

    watch: {
      index: {
        files: ['app/{,*/}*.html'],
        tasks: ['copy:index', 'targethtml:dev']
      },
      app: {
        files: ['app/**/*.js'],
        tasks: ['concat:app', 'jshint']
      },
      templates: {
        files: ['app/views/**/*.handlebars'],
        tasks: ['ractive']
      }
    }

  });

    // The ractive task - Should probably be moved to it's own repo
    // or replaced with a working one
    var desc = 'Compile ractive.js templates',
      path = require('path'),
      Ractive = require('ractive');

    grunt.registerMultiTask('ractive', desc, make);
    function make(){
        this.files.forEach(function(file){
            var templates = file.src.map(parse);
            grunt.file.write(file.dest,
                'Rownd.templates = {\n' + templates.join(',\n') + '\n}');
        });
    }

    function parse(template){
        var name = path.basename(template, '.handlebars'),
            html = grunt.file.read(template),
            parsed = Ractive.parse(html);

        return  '\t' + name + ': ' + JSON.stringify(parsed);
    }
    // End of ractive task

  // Load all of Grunt's dependencies
  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', [
    'concat',
    'jshint',
    'uglify',
    'ractive',
    'copy']
  );

};
