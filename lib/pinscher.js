;(function(definition){
  'use strict';

  module.exports = definition();

})(function(){
  'use strict';

  var Promise = require('ypromise'),
      p = Pinscher.prototype;

  function Pinscher(){
    this._queues = [];
  }

  p.run = function(fn){
    var self = this,
        queues = self._queues;

    return new Promise(function(resolve, reject){
      queues.push({fn: fn, deferred: {resolve: resolve, reject: reject}});
      if(queues.length === 1){ _run(); }
    });

    function _run(){
      var task = queues[0],
          result = task.fn(),
          promise = isPromiseAlike(result) ? result : Promise.resolve(result),
          deferred = task.deferred;

      promise.
        then(function(data){
          queues.shift();
          deferred.resolve(data);
          if(queues.length > 0){ _run(); }
        }).
        catch(function(error){
          queues.shift();
          deferred.reject(error);
          if(queues.length > 0){ _run(); }
        });
    }

    function isPromiseAlike(obj){
      return typeof obj === 'object' && typeof obj.then === 'function';
    }
  };
  return Pinscher;
});
