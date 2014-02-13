/*
 * boilerplate-h5bp
 * https://github.com/Jon Schlinkert/boilerplate-h5bp
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: {
      destination: 'site',
      origin: 'vendor/h5bp'
    },

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'src/helpers/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    copy: {
      layout: {
        options: {
          processContent: function(content) {
            return content
              .replace(/<!-- .*\s*<p>Hello world!.*<\/p>/, "{{> body }}")
              .replace(/(\].*)(\.md)/g, '$1.html')
              .replace(/(<title>)(<\/title>)/, '{{#isnt basename "index"}}$1{{titleize basename}}$2{{else}}$1Home$2{{/isnt}}');
          }
        },
        src: ['<%= site.origin %>/index.html'],
        dest: 'src/layouts/h5bp-layout.hbs'
      },
      content: {
        options: {
          processContent: function(content) {
            return content.replace(/(\].*)(\.md)/g, '$1.html');
          }
        },
        files: [{
            flatten: true,
            expand: true,
            cwd: 'vendor/h5bp/',
            src: ['doc/**'],
            dest: 'tmp/content/'
          }
        ]
      },
      essentials: {
        files: [{
            expand: true,
            cwd: 'vendor/h5bp/',
            src: ['**/*', '!**/index.html', '!**/docs'],
            dest: 'site'
          }
        ]
      }
    },

    // Build HTML from templates and data
    assemble: {
      options: {
        flatten: true,
        engine: 'handlebars',
        assets: '<%= site.destination %>/assets',
        layoutdir: 'src/layouts',
        layout: 'default.hbs',
        partials: 'src/partials/**/*.hbs',
        data: 'src/data/*.{json,yml}'
      },
      docs: {
        options: {
          pages: {
          }
        },
        files: {'<%= site.destination %>/': ['src/index.hbs'] }
      }
    },

    uglify: {
      // concat and minify scripts
    },

    // Before generating new files remove files from previous build.
    clean: {
      tmp: ['tmp/**/*', 'site/*.html']
    },
    build_gh_pages: {
      options: {
        dist: '<%= site.destination %>'
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-build-gh-pages');

  // Default tasks to be run.
  grunt.registerTask('default', [
    'test',
    'copy:layout',
    'copy:content',
    'assemble',
    'copy:essentials'
  ]);

  // Linting and tests.
  grunt.registerTask('test', ['clean', 'jshint']);
};
