var fs = require('fs');
var iconv = require('iconv-lite');
var path = require('path');

pathName = __dirname+'/test.txt';
fileName = path.basename(pathName);
fileContent = fs.readFileSync(pathName);
src = iconv.decode(fileContent, 'utf8');
src = "'use strict';\n"+src

fs.writeFile(pathName, "minispade.register('" +fileName+ "', function() {\n" + src + '});');
