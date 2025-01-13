const express = require('express')
const server = express()
const ApartmentsRouter = require('./routes/routes')
const notFoundMiddleware = require('./middlewares/NotFound')

const cors = require('cors');
server.use(cors());

const PORT = process.env.PORT
const HOST = process.env.HOST

server.use(express.json())

server.use('/apartments', ApartmentsRouter)

server.use('/users', ApartmentsRouter)

server.get('/', (req, res) => {
    res.send('Server is running')
})


server.use(notFoundMiddleware)


server.listen(PORT, () => {
    console.log(`Server is running on port ${HOST}:${PORT}`);

})


