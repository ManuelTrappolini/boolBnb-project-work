
const connection = require('../database/connection')


function index(req, res) {
    connection.query('SELECT * FROM apartments', (err, results) => {
        if (err) return res.status(500).json({ err: err })
        console.log(results);
        res.json({ apartments: results })
    })
}


function show(req, res) {
    const id = req.params.id
    const sql = 'SELECT * FROM apartments WHERE id = ? '
    const reviewsSql = 'SELECT * FROM reviews WHERE id_apartment = ? '

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err })

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err })

            const apartment = {
                ...results[0],
                reviews: reviewsResults
            }

            res.json(apartment)
        })


    })

}

function review(req, res) {

    const apartment_id = Number(req.params.id)

    const { author_name, description, date, days_of_stay, id_apartment } = req.body

    const sql = "INSERT INTO 'reviews' SET author_name=? , description=?, date=?, days_of_stay=?, id_apartment=?"

    connection.query(sql, [author_name, description, date, days_of_stay, id_apartment], (err, result) => {
        if (err) return res.status(500).json({ err: err })

        return res.status(201).json({ success: true })
    })



}

function apartment(req, res) {
    const apartment_id = Number(req.params.id)

    const { title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, vote } = req.body

    const sql = "INSERT INTO 'apartments' SET title=? , rooms_number=?, beds=?, bathrooms=?, square_meters=?, address=?, picture_url=?, description=?, vote=? "

    connection.query(sql, [title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, vote], (err, result) => {
        if (err) return res.status(500).json({ err: err })

        return res.status(201).json({ success: true })
    })

    console.log(id_apartment);

}





module.exports = { index, show, review, apartment }