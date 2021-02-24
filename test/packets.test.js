var expect = require('chai').expect;
var mockudp = require('./mock-udp');
var Measures = require('..');

describe('Packets', function () {
  describe('#send one packet', function () {
    it('should send one packet', function (done) {
      mockudp('localhost:1984');
      var measures = new Measures('myclient', {host: 'localhost', port: 1984});
      var doc = {name: 'jon', lastname: 'doe', age: 22};

      measures.metrify('mymetric', 1, doc, function (err) {
        expect(err).to.be.null;
        done();
      });
    });
  });
});
