const express = require('express')
const router = express.Router()

const { authenticateToken } = require('../middlewares/auth');
const ApartmentsController = require('../Controllers/ApartmentsController')
const UserController = require('../Controllers/UsersController');
const MessageController = require('../Controllers/MessageController');

router.get('/', ApartmentsController.index)

router.get('/:id', ApartmentsController.show)

router.post('/:id/review', ApartmentsController.addReview)

router.post('/addapartment', authenticateToken, ApartmentsController.addApartment)

router.put('/:id', authenticateToken,ApartmentsController.updateApartment)

/* users routes */

router.post('/login', UserController.login)

router.post('/register', UserController.register)

/* message route */

router.post('/:id', MessageController.sendMessage)


module.exports = router

