import React, { useState } from 'react';

export default function AddApartment() {
    const [title, setTitle] = useState('');
    const [rooms, setRooms] = useState('');
    const [beds, setBeds] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [square_meters, setSquare_meters] = useState('');
    const [address, setAddress] = useState('');
    const [picture_url, setPicture_url] = useState('');
    const [description, setDescription] = useState('');

    // Funzione per gestire i cambiamenti nei campi


    // Funzione per inviare i dati al backend
    const handleSubmit = (e) => {
        e.preventDefault();

        // Aggiungi la validazione per tutti i campi
        if (
            title.length < 5 ||
            rooms === '' ||
            beds === '' ||
            bathrooms === '' ||
            square_meters === '' ||
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
            rooms: parseInt(rooms),
            beds: parseInt(beds),
            bathrooms: parseInt(bathrooms),
            square_meters: parseInt(square_meters),
            address,
            picture_url,
            description,
        };
        console.log("Dati inviati al server:", formData);

        // Usando .then() per gestire la promise
        fetch('http://localhost:3004/apartments/addapartment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();  // Se la risposta è ok, parsifica la risposta come JSON
                } else {
                    throw new Error('Errore nell\'aggiunta dell\'appartamento');
                }
            })
            .then(data => {
                console.log('Appartamento aggiunto:', data);
                alert('Appartamento aggiunto con successo!');
            })
            .catch(error => {
                console.error('Errore:', error);
                alert('Errore nella comunicazione con il server');
            });
    };

    return (
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
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
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
                <button type="submit" className="btn btn-primary">Invia</button>
            </div>
        </form>
    );
}
