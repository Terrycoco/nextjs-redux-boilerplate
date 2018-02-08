const path = require('path');
const compression = require('compression');
const express = require('express');
const next = require('next');
const { createReadStream } = require('fs');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dir: '.',  dev });
const handle = app.getRequestHandler();
const { parse } = require('url');
console.log('served from: ', __dirname);
const getRoutes = require('./routes.js');
const staticDir = './static';
const manifest = require('./manifest.json');

(async () => {
  try {
  require('./static/test');
  await app.prepare();
  const server = express();
  server.use(compression());

  server.get('*', (req, res, next) => {
    if (req.hostname !== 'localhost' && req.headers['x-forwarded-proto'] != 'https') {
      res.redirect(`https://${req.hostname}${req.url}`);
    } else {
      return next();
    }
  });

  //serve the manifest
  server.get('/manifest.json', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(__dirname, 'manifest.json'));
  });


  //serve the service worker 
  server.get('/my-service-worker.js', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('content-type', 'text/javascript');
    let file = path.join(__dirname,  'my-service-worker.js');
    res.sendFile(file);
  });

  server.use("/static", express.static(staticDir, {
    maxAge: "30d"
  }));




 //example of parameterized query
  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id })
  });

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query = {} } = parsedUrl;
    const route = getRoutes[pathname];
    if (route) {
      return app.render(req, res, route.page, route.query);
    }
    return handle(req, res)
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
} catch (e) {
  console.error(e);
  process.exit(1);
}

})();