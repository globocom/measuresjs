## MeasuresJS

This modules allows send metrics to Measures service.

example:

```
var Measures = require('measuresjs');
var measures = new Measures('myclient', {host: 'example.com', port: 1984});

var doc = {
  date: new Date().toString(),
  status: 200,
  path: '/streams'
};

measures.metrify('mymetric', 1, doc);

/* you can pass an error-first callback as the
   last argument of the metrify method
*/
measures.metrify('mymetric', 1, doc, function (err) {
  if (err) console.log(err);
});
```

## Install Dependencies

```
$ yarn || yarn install || npm install
```

## Tests

```
$ yarn test || npm test
```

## Debug

This lib uses the [debug](https://www.npmjs.com/package/debug) module to log all internal errors and info. To enable this on debug needings set the DEBUG environment variable:

```
$ DEBUG=measuresjs:*
```
