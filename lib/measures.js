var dgram = require('dgram');
var async = require('async');
var info = require('debug')('measuresjs:info');
var error = require('debug')('measuresjs:error');

function Measure(client, address) {
  if (!client) throw new Error('Measures class: client could not be empty.');
  if (typeof(client) !== 'string') throw new Error('Measures class: client must be a string.');
  if (typeof(address) !== 'object') throw new Error('Measures class: address must be an object.');
  if (!address || !Object.keys(address).length) throw new Error('Measures class: address object could not be empty.');
  if (!address.host || !address.port) throw new Error('Measures class: address.host or address.port is empty.');
  if (typeof(address.host) !== 'string') throw new Error('Measures class: address.host must be a string.');
  if (typeof(address.port) !== 'number') throw new Error('Measures class: address.port must be an integer.');

  var q = async.queue(function (task, cb) {
    let socket = dgram.createSocket('udp4');

    socket.connect(address.port, address.host, function(err) {
      if (err) {
        if (task.callback) task.callback(err);
        cb(err);
      } else {
        socket.send(task.buffer,
          function (err) {
            socket.close();
            if (task.callback) task.callback(err);
            cb(err);
          }
        );
      }
    });
  }, 2);

  q.drain = function () {
    info('all messages have been processed.');
  };

  this.metrify = function (metric, counter, dms, cb) {
    if (!metric) return cb(new Error('Measures.count: metric object could not be empty.'));
    if (typeof(metric) !== 'string') return cb(new Error('Measures.count: metric must be a string.'));

    var message = {
      client: client,
      metric: metric,
      count: counter || 1
    };

    Object.keys(message).forEach(function (prop) {
      dms[prop] = message[prop];
    });

    var buffer = Buffer.from(JSON.stringify(dms));

    q.push({buffer: buffer, callback: cb}, function (err) {
      (err) ? error(err) : info('metrics sent.');
    });
  };
};

module.exports = Measure;