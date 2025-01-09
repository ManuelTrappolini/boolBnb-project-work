const express = require('express')
const server = express()
const controller = require('./Controllers/ApartmentsController')


const PORT = process.env.PORT
const HOST = process.env.HOST

server.listen(PORT, () => {
    console.log(`Server is running on port ${HOST}:${PORT}`);

})

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Server is running')
})

server.get('/apartments', controller.index)

server.get('/apartments/:id', controller.show)

server.post('/apartments/:id/review', controller.review)

server.post('/apartments/:id/addapartment', controller.apartment)
