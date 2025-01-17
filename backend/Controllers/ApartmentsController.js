
const connection = require('../database/connection')

/* show apartments */
function index(req, res) {
    connection.query('SELECT * FROM apartments ORDER BY vote DESC', (err, results) => {
        if (err) return res.status(500).json({ err: err })
        console.log(results);
        res.json({ apartments: results })
    })
}

function show(req, res) {
    const slug = req.params.slug;
    console.log('Slug ricevuto dal client:', slug); // Log dello slug

    // Assicurati che lo slug non sia undefined o vuoto
    if (!slug) {
        console.error('Lo slug è undefined o vuoto');
        return res.status(400).json({ error: 'Slug mancante' });
    }

    const sql = 'SELECT * FROM apartments WHERE slug = ?';
    const reviewsSql = 'SELECT * FROM reviews WHERE id_apartment = ? ORDER BY date DESC';
    const servicesSql = 'SELECT * FROM apartment_service WHERE id_apartment = ?';

    connection.query(sql, [slug], (err, results) => {
        if (err) return res.status(500).json({ err: err });

        if (results.length === 0) return res.status(404).json({ err: 'Apartment not found' });

        const apartmentId = results[0].id;  // Prendi l'ID dell'appartamento

        // Query per le recensioni
        connection.query(reviewsSql, [apartmentId], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err });

            // Query per i servizi
            connection.query(servicesSql, [apartmentId], (err, servicesResults) => {
                if (err) return res.status(500).json({ err: err });

                // Combina i risultati
                const apartment = {
                    ...results[0],  // Aggiungi i dettagli dell'appartamento
                    reviews: reviewsResults,  // Aggiungi le recensioni
                    services: servicesResults  // Aggiungi i servizi
                };

                res.json(apartment);  // Invia la risposta con l'appartamento completo
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
    const apartment_slug = req.params.slug;  // Modificato: recupera lo slug invece dell'id

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
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Recupera l'ID dell'appartamento tramite lo slug
    const checkApartmentExistence = 'SELECT id FROM apartments WHERE slug = ?';  // Modificato: usa lo slug
    connection.query(checkApartmentExistence, [apartment_slug], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            return res.status(404).json({ error: 'Apartment not found' });
        }

        const apartment_id = results[0].id;  // Recuperato l'ID dell'appartamento tramite lo slug

        // Inserisci la recensione nel database
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
    const { title, rooms_number, beds, bathrooms, square_meters, address, picture_url, description, services, city, slug } = req.body;
    const apartmentSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    /* validation data */
    const errors = validateApartmentData({ title, rooms_number, beds, bathrooms, square_meters, address, description, services });
    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }


    /* const owner_id = req.user.userId; */
    const owner_id = 2;

    const sql = 'INSERT INTO apartments (title, rooms_number, beds, bathrooms, square_meters, address, city, picture_url, description, vote, owner_id, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)';
    const apartmentData = [title, rooms_number, beds, bathrooms, square_meters, address, city, picture_url, description, owner_id, apartmentSlug];


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

/* add vote to apartment */


function voteApartment(req, res) {
    const apartmentId = parseInt(req.params.id);  // Ora ricevi l'ID dell'appartamento
    console.log(`ID ricevuto dal backend: ${apartmentId}`);  // Verifica che l'ID sia corretto
    if (isNaN(apartmentId)) {
        return res.status(400).json({ error: 'Invalid apartment ID' });
    }
    // Controlla se l'appartamento esiste usando l'ID
    const checkApartmentExistence = 'SELECT * FROM apartments WHERE id = ?';  // Cambia da slug a id
    connection.query(checkApartmentExistence, [apartmentId], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            console.log("Appartamento non trovato");
            return res.status(404).json({ error: 'Apartment not found' });
        }

        // ID dell'appartamento trovato
        console.log(`ID dell'appartamento trovato: ${apartmentId}`);

        // Incrementa il voto utilizzando l'ID
        const updateVoteSql = 'UPDATE apartments SET vote = vote + 1 WHERE id = ?';  // Usa l'ID per l'aggiornamento
        connection.query(updateVoteSql, [apartmentId], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            console.log(`Voto aggiornato per l'appartamento con ID: ${apartmentId}`);
            res.json({ success: true, vote: result.affectedRows });
        });
    });
}




module.exports = { index, show, addReview, addApartment, updateApartment, voteApartment }