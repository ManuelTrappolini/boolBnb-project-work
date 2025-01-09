const express = require('express')
const router = express.Router()

const { authenticateToken } = require('../middlewares/auth');
const ApartmentsController = require('../Controllers/ApartmentsController')
const UserController = require('../Controllers/UsersController')

router.get('/', ApartmentsController.index)

router.get('/:id', ApartmentsController.show)

router.post('/:id/review', ApartmentsController.addReview)

router.post('/addapartment', authenticateToken, ApartmentsController.addApartment)

router.post('/')



module.exports = router

