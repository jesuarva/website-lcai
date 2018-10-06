// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
   // CONFIGURE GRUNT
   grunt.initConfig({
      // get the configuration info from package.json file
      // this way we can use things like name and version (pkg.name)
      pkg: grunt.file.readJSON('package.json'),

      // all of our configuration goes here
      concat: {
        options: {
          separator: ';'
        },
        js: {
          src: ['src/**/*.js'],
          dest: 'dist/js/<%= pkg.name %>.js'
        }
      },

      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
        },
        js: {
          files: {
            'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
          }
        }
      },

      jshint: {
        files: ['gruntfile.js', 'src/**/*.js'],
        options: {
          globals: {
            jQuery: true
          }
        }
      },

      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }


   });

   // log something
   grunt.log.write('Hi there, just grunt working!\n');

   // Load the plugins
     // Removes grunt.loadNpmTasks, then add the require('jit-grunt')(grunt) instead. Only it.
       require('jit-grunt')(grunt);
         // grunt.loadNpmTasks('grunt-contrib-concat');
         // grunt.loadNpmTasks('grunt-contrib-uglify');
         // grunt.loadNpmTasks('grunt-contrib-jshint');
         // grunt.loadNpmTasks('grunt-contrib-watch');
         // grunt.loadNpmTasks('grunt-contrib-less');

   // Default task(s).
   grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
   grunt.registerTask('conglify', ['concat', 'uglify']);
};
