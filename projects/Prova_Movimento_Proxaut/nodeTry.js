
var http = require('http');

var vda = require('vda-5050-lib');

const masterControl = new vda.MasterController(
  { interfaceName: "logctx42", transport: 
    { brokerUrl: "mqtt://mybroker.com:1883" }, 
      vdaVersion: "2.0.0" 
  }
);



http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8082);