var read = require('readable-stream')
var transform = read.Transform

module.exports = RouteStream
/******************************************************************************
  ROUTE STREAM

  // @BEACON https://www.npmjs.com/package/dataplex
  // @BEACON https://www.npmjs.com/package/stream-router
  // @BEACON https://www.npmjs.com/package/multiplex
  // @BEACON https://www.npmjs.com/package/multiplex-stream
  // @INSPIRE https://www.npmjs.com/package/stream-dom
  // @INSPIRE https://www.npmjs.com/package/pull-routes
  // @TODO https://www.npmjs.com/search?q=dom-stream-router
  // @TODO https://www.npmjs.com/package/dom-stream
******************************************************************************/
RouteStream.prototype.__proto__ = transform.prototype
function RouteStream (_routes = {}) {
  _routes[404] = _routes[404] || _404
  var transform$ = transform({ objectMode: true })
  for (key in transform$) { routes[key] = transform$[key] }
  routes.__proto__ = RouteStream.prototype
  routes._transform = through
  var _location
  return routes
  function routes (name, route) { _routes[name] = route }
  function through ({to,data} = {}, encoding, next) {
    if (!to) to = 404
    var from = _location
    _location = to
    var route = _routes[to] || _routes[404]
    if (route) next(null, route({from, to, data}))
    else next(new Error(`no matching route for: "${to}"`))
  }
}
function _404 ({from,to,data}) { return JSON.stringify({from,to,data},null,2) }
