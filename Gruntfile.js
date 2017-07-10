'use strict';

module.exports = function(grunt){

  /* Configure
  ============================ */
  var configs = {   
    
    css_combine_files : [
      'src/vendor/css/bootstrap.min.css',
      'src/css/combined.css'],
    
    js_combine_files : [
      'src/vendor/js/jquery-1.10.1.min.js',
      'src/vendor/js/modernizr-2.6.2-respond-1.1.0.min.js',
      'src/vendor/js/bootstrap.min.js',
      'src/js/main.js'],
    
    js_hint_files : [
      'src/js/main.js'],

    watch_files : [
      'src/less/*',
      'src/js/*',
      'src/vendor/css/*',
      'src/vendor/js/*']
  }

  /* Init
  ============================ */
  grunt.initConfig({
    less: {
      production: {
        files: {
          "src/css/combined.css" : "src/less/main.less"
        }
      }
    },
    autoprefixer: {
        production: {
          files: {
            'src/css/combined.css': 'src/css/combined.css'
          }
        }
    },
    jshint: {
      beforeconcat: configs.js_hint_files
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: configs.js_combine_files,
        dest: 'src/js/compiled.js',
      },
    },
    uglify: {
        my_target: {
          files: {
            'dist/js/compiled.min.js' : 'src/js/compiled.js'
          }
        }
    },
    cssmin: {
      combine: {
        files: {
          'dist/css/main.min.css' : configs.css_combine_files
        }
      }
    },
    watch: {
      src: {
        files: configs.watch_files,
        tasks: ['build']
      }
    },
    imagemin: {
        dist: {
            files: [{
                expand: true,
                cwd: 'src/images/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'dist/images/'
            }]
        }
    }
  });

  // Add plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Register tasks
  grunt.registerTask('build', ['less','autoprefixer','cssmin','concat','uglify','jshint']);
  grunt.registerTask('default', ['less','autoprefixer','cssmin','concat','uglify','jshint','imagemin']);

  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });

};
