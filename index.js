const http = require('http')
const app = require('./app')
const { PORT } = require('./config/config')
const { info } = require('./config/logger')

const server = http.createServer(app)

server.listen(PORT, () => {
  info(`Server is running on  port ${PORT}`)
})
