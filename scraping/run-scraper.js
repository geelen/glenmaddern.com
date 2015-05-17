var portfinder = require('portfinder'),
  pushserve = require('pushserve'),
  exec = require('fluent-exec'),
  paths = require('./paths')

console.log("looking for a port")
portfinder.basePort = 1984

portfinder.getPort(function (err, port) {
  if (err) throw err;
  console.log("got here tho")

  pushserve({port: port, indexPath: 'src/200.html', path: 'src'}, function () {
    console.log("Loaded up SRC on http://localhost:" + port)

    var cmd = 'phantomjs ' + __dirname +
      '/scrape.js http://localhost:' + port +
      ' "' + paths.join(' ') + '"'
    console.log(cmd)
    exec(cmd).then(function (output) {
      console.log("ok!")
      console.log(output)
      process.exit()
    })
  })
});
