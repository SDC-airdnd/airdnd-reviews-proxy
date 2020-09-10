// Dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const axios = require('axios').default;
require('newrelic');

// Config
const { routes } = require('./config.json');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public/dist`));

// for (route of routes) {
//     app.use(route.route,
//         proxy({
//             target: route.address,
//             pathRewrite: (path, req) => {
//                 console.log(path,req.url);
//                 if (req.query.id) {
//                   return `?id=${req.query.id}`
//                 } else {
//                   return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
//                 }
//             },
//             onProxyRes: (proxyRes, req, res) => {
//                 console.log(proxyRes.data)
//                 // console.log(req),
//                 // console.log(res)
//             }
//         })
//     );
// }

app.get('/reviews/:id', (req, res) => {
  console.log(req.url);
})

app.get('/listings/:id', (req, res) => {
  console.log(req.params.id);
})

app.get('/room', (req, res) => {
  console.log(req.query.id);
})

app.get('/booking', (req, res) => {
  console.log(req.query.id)
})


app.listen(PORT, () => {
    console.log('Proxy listening on port ' + PORT);
});
