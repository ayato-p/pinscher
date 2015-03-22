;(function(){
  var http = require('http'),
      url = require('url');

  http.createServer(function(req, res){
    var method = req.method,
        query = url.parse(req.url, true).query,
        first = Number(query.first),
        second = Number(query.second);

    if(method === 'GET' && Number.isInteger(first) && Number.isInteger(second)){
      res.writeHead(200, {'Content-Type': 'application/json'});
      setTimeout(function(){
        res.end(JSON.stringify({result: first * second}));
      }, 1000);

    } else {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end('Arguments Error\n');

    }
  }).listen(3000, '127.0.0.1');

  console.log('Server running at http://127.0.0.1:3000/');
})();
