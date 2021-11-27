var http = require('http');

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  console.log(request);
  const ip = require('os').networkInterfaces().eth0[0].address;
  response.writeHead(200);
  response.end(JSON.stringify({ workload: "two", ip:ip, url: request.url }));
};

var www = http.createServer(handleRequest);
www.listen(80);