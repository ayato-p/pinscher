;(function(){
  var http = require('http'),
      Pinscher = require('../lib/pinscher'),
      Promise = require('ypromise'),
      _ = require('underscore');

  var pinscher = new Pinscher(),
      memoizedMul = _.memoize(asyncMul, hashFunc);

  // memoizedMul(10, 20).then(console.log);
  // memoizedMul(20, 20).then(console.log);
  // memoizedMul(11, 20).then(console.log);
  // memoizedMul(10, 20).then(console.log);
  // memoizedMul(11, 20).then(console.log);
  // memoizedMul(10, 20).then(console.log);

  pinscher.run(memoizedMul.bind(null, 10, 20)).then(console.log);
  pinscher.run(memoizedMul.bind(null, 20, 20)).then(console.log);
  pinscher.run(memoizedMul.bind(null, 11, 20)).then(console.log);
  pinscher.run(memoizedMul.bind(null, 10, 20)).then(console.log);
  pinscher.run(memoizedMul.bind(null, 11, 20)).then(console.log);
  pinscher.run(memoizedMul.bind(null, 10, 20)).then(console.log);

  function asyncMul(first, second){
    return new Promise(function(resolve, reject){
      var url = 'http://localhost:3000/?first=' + first + '&second=' + second;

      http.get(url, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){ resolve(chunk); });
        res.on('error', function(e){ reject(e); });
      });
    });
  }

  function hashFunc(){
    var arg = Array.prototype.slice.call(arguments);
    return JSON.stringify(arg);
  }
})();
