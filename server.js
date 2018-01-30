const express = require('express')
const next = require('next')
const { createReadStream } = require('fs');
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  //serves the service worker 
  server.get('/sw.js', (req, res) => {
    res.setHeader('content-type', 'text/javascript');
    createReadStream(__dirname + '/offline/service-worker.js').pipe(res);
  })

 //example of parameterized query
  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/posts', { id: req.params.id })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
