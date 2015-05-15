var portfinder = require('portfinder'),
  httpServer = require('http-server')

console.log("looking for a port")
portfinder.basePort = 1984

portfinder.getPort(function (err, port) {
  if (err) throw err;
  console.log("got here tho")

  var server = httpServer.createServer({root: 'src'})
  server.listen(port, function () {
    console.log("Loaded up SRC on http://localhost:" + port)

  })
});
