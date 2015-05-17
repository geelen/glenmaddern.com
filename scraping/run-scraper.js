var portfinder = require('portfinder'),
  pushserve = require('pushserve'),
  exec = require('fluent-exec'),
  paths = require('./paths')

portfinder.basePort = 1984

portfinder.getPort(function (err, port) {
  if (err) throw err;
  console.log("Port " + port + " is open.")

  pushserve({port: port, indexPath: 'src/200.html', path: 'src'}, function () {
    var cmd = 'phantomjs ' + __dirname +
      '/scrape.js http://localhost:' + port +
      ' "' + paths.join(' ') + '"'
    console.log('Running: ' + cmd)
    exec(cmd).then(function (output) {
      console.log(output)
      process.exit()
    })
  })
});
