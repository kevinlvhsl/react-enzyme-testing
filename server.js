const jsonServer = require('json-server')
const express = require('express')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middleware = jsonServer.defaults()
const root = __dirname + '/build'
const port = process.env.LEANCLOUD_APP_PORT || 3000

server.use(express.static(root, { maxAge: 86400 * 1000 }))
server.use(middleware)

const reactRouterWhiteList = ['/create', '/edit/:id']

server.get(reactRouterWhiteList, (request, response) => {
  response.sendFile(path.resolve(root, 'index.html'))
})

server.use(router)
server.listen(port, () => {
  console.log('server in running in localhost:3000')
})