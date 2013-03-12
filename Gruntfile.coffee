module.exports = (grunt) ->
  
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    
    minispade:
      options:
        renameRequire: true
        useStrict: false
        prefixToRemove: 'compiledJS/'
      files:
        #FIX THIS BULLSHIT
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
      tasks: ['coffee', 'minispade']

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')

  grunt.registerTask('default', ['coffee', 'minispade'])
  require('./minispade/grunt-minispade')(grunt)
