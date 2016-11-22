# route-stream
router to stream routes

# usage
`npm install route-stream`

```js
var router = require('route-stream')

// prepare some router handlers
function home ({ from, to, data }) {
  return `<div>home:"${from}"=>"${to}",${JSON.stringify(data)}</div>`
}
function products ({ from, to, data }) {
  return `<div>products:"${from}"=>"${to}",${JSON.stringify(data)}</div>`
}
function _404 ({ from, to, data }) {
  return `<div>404:"${from}"=>"${to}",${JSON.stringify(data)}</div>`
}

// use
var routes = router({ '/': home, '/products': products, 404: _404 })
// OR
var routes = router()
routes(404, _404) // 404 route is optional - router has a default 404 route
routes('/', home)
routes('/products', products)
routes('/products', undefined) // remove route '/products'

console.log(routes instanceof router) // => true

// test
routes.on('data', function parent (route) { console.log(route) })

// NAVIGATE
routes.write({ to: '/' })
routes.write({ to: '/doesntexist', data: { x: 1 } })
routes.write({ to: '/products', data: { x: 1 } })
routes.write({ to: '/' })
routes.write({ to: '/', data: { foo: 'bar' }})
routes.write({ data: { foo: 'only data' }})
```
