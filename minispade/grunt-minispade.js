module.exports = function(grunt) {
  var path = require('path');
  var fs = require('fs');
  
  grunt.registerMultiTask('minispade', 'wrap files in minispade closures.', function() {
    var options = this.options ({
      renameRequire: false,
      useStrict: false
    });
    grunt.verbose.writeflags(options, 'Options'); 

    this.files.forEach(function(f) {
      var output = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '"not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return formatMinispade(filepath, options);
      }).join(grunt.util.normalizelf(grunt.util.linefeed));
      
      if (output.length < 1) {
        grunt.log.warn('Destination not written,  compiled files were empty.');
      } else {
        grunt.file.write(f.dest, output);
        grunt.log.writeln('File ' + f.dest + ' created.'); 
      }
    });
  });

  var formatMinispade = function(srcFile, options) {
    var ext = path.extname(srcFile);
    var fileName = path.basename(srcFile); 
    var output,
        contents,
        newContents;   
    //remove unwanted prefix from minispade registers
    if (options.prefixToRemove !== "") {
      fileName = fileName.replace(options.prefixToRemove, '');
    }
 
    if (ext !== '.js') {
      grunt.log.error('minispade may only be run on .js files');
    } else {
      contents = grunt.file.read(srcFile);
      if (options.renameRequire === true) {
        contents = contents.replace(/^\s*require\s*\(\s*/g, "minispade.require(");
        contents = contents.replace(/^\s*requireAll\s*\(\s*/g, "minispade.requireAll("); 
      } 
      if (options.useStrict === true) {
        contents = "'use strict';\n" + contents
      }
      newContents = "minispade.register('"+fileName+"', function() {\n"+contents+"});\n";
      //output = grunt.file.write(fileName, newContents);
      grunt.log.writeln(fileName+" minispaded."); 
      return newContents;
    }
  }
}
