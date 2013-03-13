module.exports = (grunt) ->
  
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    
    clean: ["compiledJS/"]
  
    minispade:
      options:
        renameRequire: true
        useStrict: false
        prefixToRemove: 'compiledJS/'
      files:
        src: ['compiledJS/**/*.js']
        dest: 'solar.js'

    coffee:
      options:
        bare: true
      compile:
        files:
          'server.js': 'coffee/server/server.coffee'
      glob_to_multiple:
        expand: true
        cwd: 'coffee/'
        src: ['*.coffee']
        dest: 'compiledJS'
        ext: '.js'

    watch:
      files: ['coffee/*.coffee', 'server.coffee']
      tasks: ['clean', 'coffee', 'minispade']

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-clean')
  #grunt.loadNpmTasks('grunt-contrib-livereload')
  #grunt.loadNpmTasks('grunt-contrib-connect')
  #grunt.loadNpmTasks('grunt-regarde')
  grunt.loadNpmTasks('grunt-minispade')

  grunt.registerTask('default', ['clean', 'coffee', 'minispade'])
