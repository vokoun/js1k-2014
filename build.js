// build.js
// david vokoun  <david@vokoun.me>

// node build.js <scriptfile>
//   scriptfile: the name of the script file in the js dir
//               this name also is the name of the .html file that is output
// ex: node build.js test.js

var fs = require('fs')
  , UglifyJS = require('uglify-js')

  , shim = "\r\n<!doctype html>\r\n<html>\r\n\t<head>\r\n\t\t<title>JS1k, [COMPO] demo submission [ID]</title>\r\n\t\t<meta charset=\"utf-8\" />\r\n    <style>\r\n      html, body { margin: 0; padding: 0; border: 0; }\r\n      #c { display: block; } /* kill scrollbars from hell */\r\n    </style>\r\n\t</head>\r\n\t<body>\r\n\t\t<canvas id=\"c\"></canvas>\r\n\t\t<script>\r\n\t\t\tvar a = document.getElementsByTagName('canvas')[0];\r\n\t\t\tvar b = document.body;\r\n      var d = function(e){ return function(){ e.parentNode.removeChild(e); }; }(a);\r\n      // unprefix some popular vendor prefixed things (but stick to their original name)\r\n      var AudioContext =\r\n        window.AudioContext ||\r\n        window.webkitAudioContext;\r\n      var requestAnimationFrame =\r\n        window.requestAnimationFrame ||\r\n        window.mozRequestAnimationFrame ||\r\n        window.webkitRequestAnimationFrame ||\r\n        window.msRequestAnimationFrame ||\r\n        function(f){ setTimeout(f, 1000/30); };\r\n      // stretch canvas to screen size (once, wont onresize!)\r\n      a.style.width = (a.width = innerWidth) + 'px';\r\n      a.style.height = (a.height = innerHeight) + 'px';\r\n\r\n      var c = a.getContext('2d');\r\n\t\t</script>\r\n\t\t<script>\r\n// start of submission //\r\n<%= script %>\r\n// end of submission //\r\n\t\t</script>\r\n\t</body>\r\n</html>\r\n"
 
  , name = typeof process.argv[2] != undefined ? process.argv[2].replace('.js', '') : false
  , script = name ? fs.readFileSync(name+'.js') : false
  ;


if(!script) {

  console.log('ERROR: Missing argument: node build.js <scriptname>');

} else {

  var min = UglifyJS.minify(script.toString(), {mangle:true, fromString: true }).code
    , output = shim.replace('<%= script %>', min)
    , res = ''
    ;

  fs.writeFileSync( name + '.html', output);  

  res = 'OK: '+ 
        'Script Size: ['+min.length+' bytes], '+
        'Output: ['+name+'.html]\n';

  if(min.length > 1024)
    res = 'WARN: '+
          'Script size: ['+min.length+' bytes] '+
          '(exceeds 1kb limit by '+(min.length-1024)+' bytes), '+
          'Output: ['+name+'.html] \n';

  console.log(res);
  
}