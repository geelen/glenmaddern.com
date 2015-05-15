var page = require('webpage').create(),
  system = require('system'),
  host = system.args[1] || "http://localhost:1983",
  paths = (system.args[2] || "/").split(" "),
  fs = require('fs'),
  doneCallback;

console.log(phantom.libraryPath)

page.viewportSize = { width: 960, height: 720 }

page.onConsoleMessage = function(message) {
  if (message.match(/^### DONE/)) {
    doneCallback()
  } else {
    console.log(message)
  }
};


function getPage(pathNr) {
  var url = host + paths[pathNr]
  console.log("Loading " + url)
  page.open(url, function (status) {
    if (status == "success") {
      var timeout;
      doneCallback = function () {
        clearTimeout(timeout)
        console.log("Finished. Saving HTML.")
        fs.write(phantom.libraryPath + "/snapshots/" + pathNr + ".html", page.content, 'w')
        console.log("Saving PNG.")
        page.render(phantom.libraryPath + "/snapshots/" + pathNr + ".png")
        if (pathNr < paths.length - 1) {
          getPage(pathNr + 1)
        } else {
          setTimeout(function () {
            phantom.exit()
          }, 1000)
        }
      }
      timeout = setTimeout(doneCallback, 30000)
    } else {
      console.log(status)
      phantom.exit()
    }
  })
}

getPage(0)
