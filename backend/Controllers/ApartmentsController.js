
const connection = require('../database/connection')

/* show apartments */
function index(req, res) {
    connection.query('SELECT * FROM apartments ORDER BY vote DESC', (err, results) => {
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
    const servicesSql = 'SELECT * FROM apartment_service WHERE id_apartment = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err });

        if (results.length == 0) return res.status(404).json({ err: 'Apartment not found' });

        // Esegui la query per le recensioni
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err });

            // Esegui la query per i servizi
            connection.query(servicesSql, [id], (err, servicesResults) => {
                if (err) return res.status(500).json({ err: err });

                // Crea un oggetto con tutte le informazioni
                const apartment = {
                    ...results[0],
                    reviews: reviewsResults,
                    services: servicesResults
                };

                // Rispondi con i dati completi
                res.json(apartment);
            });
        });
    });

}

/* Validation server side */
function validateApartmentData(data) {
    const errors = [];
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
        errors.push('Title is required and must be a non-empty string.');
    }
    if (!data.rooms_number || isNaN(data.rooms_number) || data.rooms_number <= 0) {
        errors.push('Rooms number is required and must be a positive number.');
    }
    if (!data.beds || isNaN(data.beds) || data.beds <= 0) {
        errors.push('Beds is required and must be a positive number.');
    }
    if (!data.bathrooms || isNaN(data.bathrooms) || data.bathrooms <= 0) {
        errors.push('Bathrooms is required and must be a positive number.');
    }
    if (!data.square_meters || isNaN(data.square_meters) || data.square_meters <= 0) {
        errors.push('Square meters is required and must be a positive number.');
    }
    if (!data.address || typeof data.address !== 'string' || data.address.trim() === '') {
        errors.push('Address is required and must be a non-empty string.');
    }
    if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
        errors.push('Description is required and must be a non-empty string.');
    }
    if (data.services && (!Array.isArray(data.services) || data.services.some(id => isNaN(id) || id <= 0))) {
        errors.push('Services must be an array of positive numbers if provided.');
    }
    return errors;
}

function validateReviewData(data) {
    const errors = [];
    if (!data.author_name || typeof data.author_name !== 'string' || data.author_name.trim() === '') {
        errors.push('Author name is required and must be a non-empty string.');
    }
    if (!data.author_email || typeof data.author_email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.author_email)) {
        errors.push('A valid author email is required.');
    }
    if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
        errors.push('Description is required and must be a non-empty string.');
    }
    if (!data.days_of_stay || isNaN(data.days_of_stay) || data.days_of_stay <= 0) {
        errors.push('Days of stay is required and must be a positive number.');
    }
    return errors;
}

/* add a review */
function addReview(req, res) {
    const { author_name, description, days_of_stay, author_email } = req.body;
    const apartment_id = req.params.id;

    /* validation data */
    const errors = validateReviewData({ author_name, description, days_of_stay, author_email });
    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    /* formatted date */
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`


    const checkApartmentExistence = 'SELECT * FROM apartments WHERE id = ?';
    connection.query(checkApartmentExistence, [apartment_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Apartment not found' });
        }


        const sql = 'INSERT INTO reviews (author_name, author_email, description, date, days_of_stay, ID_apartment) VALUES (?, ?, ?, ?, ?, ?)';
        const reviewData = [author_name, author_email, description, formattedDate, days_of_stay, apartment_id];

        connection.query(sql, reviewData, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ success: true, reviewId: result.insertId });
        });
    });
}

/* registered user add an apartment */
function addApartment(req, res) {
    const { title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, services, city } = req.body;


    /* validation data */
    const errors = validateApartmentData({ title, rooms_number, beds, bathrooms, square_meters, address, description, services });
    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }


    const owner_id = 2;

    const sql = 'INSERT INTO apartments (title, rooms_number, beds, bathrooms, square_meters, address, city, picture_url, description, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const apartmentData = [title, rooms_number, beds, bathrooms, square_meters, address, city, picture_url, description, owner_id];


    // add apartment
    connection.query(sql, apartmentData, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        const apartmentId = result.insertId;

        // check if services exist
        if (services && Array.isArray(services) && services.length > 0) {
            const bridgeSql = 'INSERT INTO apartment_service (id_apartment, id_service) VALUES ?';

            const bridgeData = services.map(serviceId => [apartmentId, serviceId]);


            connection.query(bridgeSql, [bridgeData], (bridgeErr) => {
                if (bridgeErr) return res.status(500).json({ error: bridgeErr });
                res.status(201).json({ success: true, apartmentId });
            });
        } else {


            // if there are not the services

            res.status(201).json({ success: true, apartmentId });
        }
    });
}

/* registered user update the apartment */
function updateApartment(req, res) {
    const apartment_id = req.params.id;
    const { title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, } = req.body;

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
                description = ?
             WHERE id = ?
        `;
        const updateData = [title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, apartment_id];

        // Perform the update in the database
        connection.query(updateSql, updateData, (err, result) => {
            if (err) return res.status(500).json({ error: err });

            // Successful response
            res.json({ success: true, message: 'Apartment successfully updated' });
        });
    });
}

function voteApartment(req, res) {
    const apartmentId = req.params.id

    //Check if apartment exist

    const checkApartmentExistence = 'SELECT * FROM apartments WHERE id = ?';
    connection.query(checkApartmentExistence, [apartmentId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) {
            return res.status(404).json({ error: 'Apartment not found' });
        }

        //Increment vote
        const UpdateVoteSql = 'UPDATE apartments SET vote = vote + 1 WHERE id = ?';
        connection.query(UpdateVoteSql, [apartmentId], (err, result) => {
            if (err) return res.status(500).json({ error: err })

            res.json({ success: true, message: 'Vote incremented successfully' })
        })
    })
}


module.exports = { index, show, addReview, addApartment, updateApartment, voteApartment }