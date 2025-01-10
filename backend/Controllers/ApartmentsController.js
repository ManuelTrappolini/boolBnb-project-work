
const connection = require('../database/connection')

/* show apartments */
function index(req, res) {
    connection.query('SELECT * FROM apartments', (err, results) => {
        if (err) return res.status(500).json({ err: err })
        console.log(results);
        res.json({ apartments: results })
    })
}

/* show a specific apartment */
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

/* add a review */
function addReview(req, res) {
    const { author_name, description, date, days_of_stay } = req.body;
    const apartment_id = req.params.id;


    const checkApartmentExistence = 'SELECT * FROM apartments WHERE id = ?';
    connection.query(checkApartmentExistence, [apartment_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Apartment not found' });
        }


        const sql = 'INSERT INTO reviews (author_name, description, date, days_of_stay, ID_apartment) VALUES (?, ?, ?, ?, ?)';
        const reviewData = [author_name, description, date, days_of_stay, apartment_id];

        connection.query(sql, reviewData, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ success: true, reviewId: result.insertId });
        });
    });
}

/* registered user add an apartment */
function addApartment(req, res) {
    const { title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, vote } = req.body;
    const apartment_id = req.params.id;
    const owner_id = req.user.userId;

    const sql = 'INSERT INTO apartments (title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, vote, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const reviewData = [title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, vote, owner_id];

    connection.query(sql, reviewData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ success: true, reviewId: result.insertId });
    });
};

/* registered user update the apartment */
function updateApartment(req, res) {
    const apartment_id = req.params.id;
    const { title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, vote } = req.body;

    // Let's check if apartments already exist before update
    const checkApartmentExistence = 'SELECT * FROM apartments WHERE id = ?';
    connection.query(checkApartmentExistence, [apartment_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ error: 'Apartment not found' });
        }

        // Query to update apartment's data
        const updateSql = `
            UPDATE apartments 
            SET 
                title = ?, 
                rooms_number = ?, 
                beds = ?, 
                bathrooms = ?, 
                square_meters = ?, 
                address = ?, 
                picture_url = ?, 
                description = ?, 
                vote = ? 
            WHERE id = ?
        `;
        const updateData = [title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, vote, apartment_id];

        // Perform the update in the database
        connection.query(updateSql, updateData, (err, result) => {
            if (err) return res.status(500).json({ error: err });

            // Successful response
            res.json({ success: true, message: 'Apartment successfully updated' });
        });
    });
}


module.exports = { index, show, addReview, addApartment, updateApartment }