import React from 'react'
import path from 'path'
import Fastify from 'fastify'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import fastifyStatic from 'fastify-static'
import App from './App'

const app = new Fastify({ logger: true })

app.register(fastifyStatic, {
  root: path.join(__dirname, '../build/static/'),
  prefix: '/static/'
})

app.get('*', async (req, reply) => {
  const stream = ReactDOMServer.renderToStaticNodeStream(
    <html>
      <head>
        <link href="/static/main.css" rel="stylesheet" />
        <title>CI Interface</title>
      </head>
      <body>
        <div id="app">
          <StaticRouter location={req.url} context={{}}>
            <App />
          </StaticRouter>
        </div>
      </body>
      <script src="/static/client.js"></script>
    </html>
  )

  reply.header('content-type', 'text/html; charset=utf-8')
  reply.header('content-disposition', 'inline')
  reply.send(stream)
})

async function start () {
  try {
    await app.listen(3000)
    console.log('start server')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
