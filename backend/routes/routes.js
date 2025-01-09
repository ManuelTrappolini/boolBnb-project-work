const express = require('express')
const router = express.Router()

const ApartmentsController = require('../Controllers/ApartmentsController')

router.get('/', ApartmentsController.index)

router.get('/:id', ApartmentsController.show)

router.post('/:id/review', ApartmentsController.addReview)

router.post('/addapartment', ApartmentsController.addApartment)



module.exports = router

