
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
    console.log('Slug ricevuto dal client:', slug);

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
        let imagePath = results[0].picture_url;
        if (imagePath) {
            imagePath = imagePath.replace(/\\/g, '/');  // Sostituire barre rovesciate con barre normali
            imagePath = `/uploads${imagePath}`;  // Aggiungi il prefisso per il percorso pubblico
        }
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
                    services: servicesResults,
                    image_path: imagePath  // Aggiungi i servizi
                };

                res.json(apartment);  // Invia la risposta con l'appartamento completo
            });
        });
    });
}


function showAll(req, res) {
    const apartmentsSql = 'SELECT * FROM apartments ORDER BY vote DESC';
    const reviewsSql = 'SELECT * FROM reviews';
    const servicesSql = 'SELECT * FROM apartment_service';

    connection.query(apartmentsSql, (err, apartmentsResults) => {
        if (err) return res.status(500).json({ err: err });

        if (apartmentsResults.length === 0) return res.status(404).json({ err: 'No apartments found' });

        connection.query(reviewsSql, (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err });

            connection.query(servicesSql, (err, servicesResults) => {
                if (err) return res.status(500).json({ err: err });

                // Struttura i dati con chiave "apartments"
                const apartments = apartmentsResults.map(apartment => {
                    const reviews = reviewsResults.filter(review => review.id_apartment === apartment.id);
                    const services = servicesResults.filter(service => service.id_apartment === apartment.id);

                    return {
                        ...apartment,
                        reviews,
                        services
                    };
                });

                // Responde con l'oggetto "apartments"
                res.json({ apartments });
            });
        });
    });
}

function indexCity(req, res) {
    connection.query('SELECT DISTINCT city FROM apartments', (err, results) => {
        if (err) return res.status(500).json({ error: err });

        // Estrai solo i valori delle città
        const cities = results.map(row => row.city);
        res.json({ cities });
    });
}

function indexService(req, res) {
    connection.query('SELECT * FROM services', (err, results) => {
        if (err) {
            console.error('Database error: ', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No services found' });
        }

        // Estrai solo i nomi dei servizi
        const serviceNames = results.map(service => service.name_service);

        res.json({ services: serviceNames });
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
    const apartmentId = req.params.id;

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

    // Inserisci la recensione nel database
    const sql = 'INSERT INTO reviews (author_name, author_email, description, date, days_of_stay, id_apartment) VALUES (?, ?, ?, ?, ?, ?)';
    const reviewData = [author_name, author_email, description, formattedDate, days_of_stay, apartmentId];

    connection.query(sql, reviewData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ success: true, reviewId: result.insertId });
    });

}

/* registered user add an apartment */
function addApartment(req, res) {
    console.log("Received request to add an apartment");

    // Se non viene caricato nessun file, imposta picture_url a un valore di default
    let imageUrl = '';
    if (req.file) {
        let imagePath = req.file.path;
        console.log("Image uploaded to path:", imagePath);
        imagePath = imagePath.replace(/\\/g, '/');
        imageUrl = `/uploads/${req.file.filename}`;
    } else {
        console.log("No file uploaded, using default image URL.");
    }

    const { title, rooms_number, beds, bathrooms, square_meters, address, description, services, city, slug, picture_url } = req.body;
    console.log("Apartment data received:", { title, rooms_number, beds, bathrooms, square_meters, address, description, services, city, slug, picture_url });

    const apartmentSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    console.log("Generated apartment slug:", apartmentSlug);

    // Aggiungi controllo per services (se arriva come stringa JSON)
    let parsedServices = [];
    try {
        parsedServices = JSON.parse(services);
        console.log("Parsed services data:", parsedServices);
    } catch (e) {
        console.error("Error parsing services data:", e);
    }

    console.log("Validating apartment data...");
    const errors = validateApartmentData({ title, rooms_number, beds, bathrooms, square_meters, address, description, services: parsedServices });
    console.log("Validation errors:", errors);

    if (errors.length > 0) {
        console.error("Validation errors found:", errors);
        return res.status(400).json({ success: false, errors });
    }



    const owner_id = req.user.userId; 


    // Se `picture_url` viene passato nel corpo della richiesta, usalo al posto del percorso del file
    const finalImageUrl = picture_url || imageUrl || '/path/to/default/image.jpg';  // URL di default se nessuna immagine è fornita

    // Log prima dell'invio della query SQL
    const sql = 'INSERT INTO apartments (title, rooms_number, beds, bathrooms, square_meters, address, city, picture_url, description, vote, owner_id, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)';
    const apartmentData = [title, rooms_number, beds, bathrooms, square_meters, address, city, finalImageUrl, description, owner_id, apartmentSlug];
    console.log("SQL Query:", sql);
    console.log("Apartment Data:", apartmentData);

    // Esegui la query SQL
    connection.query(sql, apartmentData, (err, result) => {
        if (err) {
            console.error("Error inserting apartment into database:", err);
            return res.status(500).json({ error: err });
        }

        console.log('Apartment insert result:', result);
        const apartmentId = result.insertId;
        console.log("Apartment inserted with ID:", apartmentId);

        if (parsedServices && Array.isArray(parsedServices) && parsedServices.length > 0) {
            console.log("Services to associate with apartment:", parsedServices);
            const bridgeSql = 'INSERT INTO apartment_service (id_apartment, id_service) VALUES ?';
            const bridgeData = parsedServices.map(serviceId => [apartmentId, serviceId]);
            console.log("SQL query to insert apartment_service:", bridgeSql);
            console.log("Bridge data:", bridgeData);

            connection.query(bridgeSql, [bridgeData], (bridgeErr) => {
                if (bridgeErr) {
                    console.error("Error inserting apartment services into database:", bridgeErr);
                    return res.status(500).json({ error: bridgeErr });
                }
                console.log("Services successfully associated with apartment.");
                res.status(201).json({ success: true, apartmentId, image_path: finalImageUrl });
            });
        } else {
            console.log("No services to associate with apartment.");
            res.status(201).json({ success: true, apartmentId, image_path: finalImageUrl });
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
    const { vote, apartmentId } = req.body

    // Controlla se l'appartamento esiste usando l'ID
    const checkApartmentExistence = 'SELECT * FROM apartments WHERE id = ?';
    connection.query(checkApartmentExistence, [apartmentId], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            console.log("Appartamento non trovato");
            return res.status(404).json({ error: 'Apartment not found' });
        }

        // Incrementa il voto utilizzando l'ID
        const updateVoteSql = 'UPDATE apartments SET vote= ? WHERE id = ?';
        connection.query(updateVoteSql, [vote, apartmentId], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.json({ success: true, vote: result.affectedRows });
        });
    });
}


module.exports = { index, show, addReview, addApartment, updateApartment, voteApartment, showAll, indexCity, indexService }




