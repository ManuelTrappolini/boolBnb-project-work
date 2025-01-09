const express = require('express')
const server = express()
const ApartmentsRouter = require('./routes/routes')


const PORT = process.env.PORT
const HOST = process.env.HOST

server.listen(PORT, () => {
    console.log(`Server is running on port ${HOST}:${PORT}`);

})

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Server is running')
})

server.use('/apartments', ApartmentsRouter)
