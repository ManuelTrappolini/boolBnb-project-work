
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

function updateApartment(req, res) {
    const apartment_id = req.params.id; // id dell'appartamento da aggiornare
    const { title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, vote } = req.body;

    // Verifica che l'appartamento esista prima di eseguire l'aggiornamento
    const checkApartmentExistence = 'SELECT * FROM apartments WHERE id = ?';
    connection.query(checkApartmentExistence, [apartment_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ error: 'Appartamento non trovato' });
        }

        // Query per aggiornare i dati dell'appartamento
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

        // Esegui l'aggiornamento nel database
        connection.query(updateSql, updateData, (err, result) => {
            if (err) return res.status(500).json({ error: err });

            // Risposta di successo
            res.json({ success: true, message: 'Appartamento aggiornato con successo' });
        });
    });
}


module.exports = { index, show, addReview, addApartment, updateApartment }