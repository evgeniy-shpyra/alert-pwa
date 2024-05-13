const fastify = require('fastify').default({ logger: false })
const path = require('path')

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'dist'),

});
fastify.setNotFoundHandler((req, res) => {
  res.sendFile('index.html')
})
fastify.listen({ port: 3000, host: '0.0.0.0' });