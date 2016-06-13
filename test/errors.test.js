var expect = require('chai').expect;
var Measures = require('..');

describe('Errors', function () {
  describe('#throw errors', function () {
    it('should return errors', function (done) {
      expect(function(){new Measures()}).to.throw('Measures class: client could not be empty.');
      expect(function(){new Measures({})}).to.throw('Measures class: client must be a string.');
      expect(function(){new Measures(1)}).to.throw('Measures class: client must be a string.');
      expect(function(){new Measures('client')}).to.throw('Measures class: address must be an object.');
      expect(function(){new Measures('client', 1)}).to.throw('Measures class: address must be an object.');
      expect(function(){new Measures('client', {})}).to.throw('Measures class: address object could not be empty.');
      expect(function(){new Measures('client', {host: '', port: ''})}).to.throw('Measures class: address.host or address.port is empty.');
      expect(function(){new Measures('client', {host: 1, port: 1984})}).to.throw('Measures class: address.host must be a string.');
      expect(function(){new Measures('client', {host: true, port: 1984})}).to.throw('Measures class: address.host must be a string.');
      expect(function(){new Measures('client', {host: {}, port: 1984})}).to.throw('Measures class: address.host must be a string.');
      expect(function(){new Measures('client', {host: 'localhost', port: true})}).to.throw('Measures class: address.port must be an integer.');
      expect(function(){new Measures('client', {host: 'localhost', port: {}})}).to.throw('Measures class: address.port must be an integer.');
      done();
    });
  });
});
