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

    less: {
      options: {
        metadata: ['src/data/*.json']
      },
      development: {
        files: {
          'site/css/styles.css': ['src/less/styles.less']
        }
      }
    },

    copy: {
      assets: {
        files: [{
            flatten: true,
            expand: true,
            src: ['src/img/**/*'],
            dest: 'site/img'
          }
        ]
      },
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

    watch: {
      scripts: {
        files: 'src/**/*',
        tasks: 'default'
      },
      css: {
        files: 'src/**/*.less',
        tasks: 'css'
      }
    },

    autoprefixer: {
      css: {
        src: 'site/css/styles.css',
        dest: 'site/css/styles.css'
      }
    },

    clean: {
      tmp: ['tmp/**/*', 'site/*.html']
    },
    'gh-pages': {
      options: {
        base: 'site',
        branch: 'master'
      },
      src: ['**']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-gh-pages');

  // Default tasks to be run.
  grunt.registerTask('default', [
    'less:development',
    'copy:assets',
    'copy:content',
    'assemble',
    'copy:essentials',
    'autoprefixer:css'
  ]);

  grunt.registerTask('css', [
    'less',
    'copy:assets',
    'copy:content',
    'copy:essentials',
    'autoprefixer:css'
  ]);

};
