var http = require('http');

http.createServer(onRequest).listen(80);

function onRequest(client_req, client_res) {
  console.log('server: ' + client_req.url);
  try {
    var options = {
      hostname: 'generic-service.ns-workload-client.svc.cluster.local',
      port: 80,
      path: client_req.url,
      method: client_req.method,
      headers: { "workload": client_req.headers["workload"] ? client_req.headers["workload"] : "01"}
    };

    console.log(options);

    var proxy = http.request(options, function (res) {
      client_res.writeHead(res.statusCode, res.headers)
      res.pipe(client_res, {
        end: true
      });
    });

    client_req.pipe(proxy, {
      end: true
    });
  }catch(e) {
    console.error('error:', e);
  }
}