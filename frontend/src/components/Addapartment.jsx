import React, { useState } from 'react';

export default function AddApartment() {
    const [title, setTitle] = useState('');
    const [rooms_number, setRooms_number] = useState('');
    const [beds, setBeds] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [square_meters, setSquare_meters] = useState('');
    const [address, setAddress] = useState('');
    const [picture_url, setPicture_url] = useState('');
    const [description, setDescription] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const servicesList = [
        { id: 3, name: 'air_conditioner' },
        { id: 5, name: 'bathroom_essentials' },
        { id: 6, name: 'bed_linen' },
        { id: 11, name: 'disabled_access' },
        { id: 4, name: 'eat-in_kitchen ' },
        { id: 1, name: 'free_parking' },
        { id: 9, name: 'pet_allowed' },
        { id: 2, name: 'private_garden' },
        { id: 10, name: 'smoker' },
        { id: 7, name: 'television' },
        { id: 8, name: 'wi-fi' },

    ];

    const handleCheckboxChange = (e) => {
        const serviceId = parseInt(e.target.value);
        setSelectedServices(prevSelectedServices =>
            e.target.checked
                ? [...prevSelectedServices, serviceId]
                : prevSelectedServices.filter(id => id !== serviceId)
        )
        console.log(selectedServices);

    }
    // Funzione per inviare i dati al backend
    const handleSubmit = (e) => {
        e.preventDefault();

        // Converto i valori numerici per evitare invalidi vuoti
        const roomsNumber = parseInt(rooms_number);
        const bedsNumber = parseInt(beds);
        const bathroomsNumber = parseInt(bathrooms);
        const squareMeters = parseInt(square_meters);

        // Aggiungi la validazione per tutti i campi
        if (
            title.length < 5 ||
            isNaN(roomsNumber) || roomsNumber <= 0 ||
            isNaN(bedsNumber) || bedsNumber <= 0 ||
            isNaN(bathroomsNumber) || bathroomsNumber <= 0 ||
            isNaN(squareMeters) || squareMeters <= 0 ||
            address.length < 5 ||
            picture_url === '' ||
            description.length < 5
        ) {
            alert('Tutti i campi devono essere riempiti correttamente.');
            return;
        }

        // Crea un oggetto con tutti i dati del form
        const formData = {
            title,
            rooms_number: roomsNumber,  // Assicuriamo che il valore sia un numero valido
            beds: bedsNumber,
            bathrooms: bathroomsNumber,
            square_meters: squareMeters,
            address,
            picture_url,
            description,
            services: selectedServices
        };

        // Log dei dati prima dell'invio
        console.log("Form Data in Submit: ", formData);

        // Usando .then() per gestire la promise
        fetch('http://localhost:3004/apartments/addapartment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),  // Serializza l'oggetto in formato JSON
        })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then(text => {
                        throw new Error(text);
                    });
                }
                return res.json();
            })
            .then((data) => {
                console.log('Appartamento aggiunto:', data);
                alert('Appartamento aggiunto con successo!');
            })
            .catch((error) => {
                console.error('Errore:', error);
                alert('Errore nella comunicazione con il server');
            });

    };

    return (
        <div className="container">
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="title" className="form-label">Titolo riepilogativo che descriva l’appartamento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="rooms" className="form-label">Numero di stanze</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rooms"
                        name="rooms"
                        value={rooms_number}
                        onChange={(e) => setRooms_number(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="beds" className="form-label">Numero di letti</label>
                    <input
                        type="number"
                        className="form-control"
                        id="beds"
                        name="beds"
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="bathrooms" className="form-label">Numero di bagni</label>
                    <input
                        type="number"
                        className="form-control"
                        id="bathrooms"
                        name="bathrooms"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="square_meters" className="form-label">Metri quadrati</label>
                    <input
                        type="number"
                        className="form-control"
                        id="square_meters"
                        name="square_meters"
                        value={square_meters}
                        onChange={(e) => setSquare_meters(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="address" className="form-label">Indirizzo completo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="description" className="form-label">Descrizione dell'appartamento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="picture_url" className="form-label">URL immagine rappresentativa dell’appartamento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="picture_url"
                        name="picture_url"
                        value={picture_url}
                        onChange={(e) => setPicture_url(e.target.value)}
                        placeholder="Inserisci l'URL dell'immagine"
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">Servizi:</label>
                    <div>
                        {servicesList.map(service => (
                            <div key={service.id} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={service.id}
                                    id={`service-${service.id}`}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor={`service-${service.id}`}>
                                    {service.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Invia</button>
                </div>
            </form>
        </div>
    );
}
