import React, { useState } from 'react';
import { FaFan, FaShower, FaBed, FaAccessibleIcon, FaUtensils, FaParking, FaPaw, FaTree, FaSmoking, FaTv, FaWifi } from 'react-icons/fa';


export default function AddApartment() {
    const [title, setTitle] = useState('');
    const [rooms_number, setRooms_number] = useState('');
    const [beds, setBeds] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [square_meters, setSquare_meters] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [picture_url, setPicture_url] = useState('');
    const [description, setDescription] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const servicesList = [
        { id: 3, name: 'Air-Conditioner', icon: <FaFan /> },
        { id: 5, name: 'Bathroom Essentials', icon: <FaShower /> },
        { id: 6, name: 'Bed linen', icon: <FaBed /> },
        { id: 11, name: 'Disabled Access', icon: <FaAccessibleIcon /> },
        { id: 4, name: 'Eat-in Kitchen', icon: <FaUtensils /> },
        { id: 1, name: 'Free Parking', icon: <FaParking /> },
        { id: 9, name: 'Pet allowed', icon: <FaPaw /> },
        { id: 2, name: 'Private Garden', icon: <FaTree /> },
        { id: 10, name: 'Smoker', icon: <FaSmoking /> },
        { id: 7, name: 'Television', icon: <FaTv /> },
        { id: 8, name: 'Wi-Fi', icon: <FaWifi /> },
    ];


    const resetForm = () => {
        setTitle('');
        setRooms_number('');
        setBeds('');
        setBathrooms('');
        setSquare_meters('');
        setAddress('');
        setCity('');
        setPicture_url('');
        setDescription('');
        setSelectedServices([]);
        setErrorMessage('');
    };

    const handleCheckboxChange = (e) => {
        const serviceId = parseInt(e.target.value);
        setSelectedServices(prevSelectedServices =>
            e.target.checked
                ? [...prevSelectedServices, serviceId]
                : prevSelectedServices.filter(id => id !== serviceId)
        )
        console.log(setSelectedServices);

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
            city.length === 0 ||
            picture_url === '' ||
            description.length < 5
        ) {
            setErrorMessage('All fields must be filled in correctly');
            return;
        }

        // Reset error message
        setErrorMessage('');

        // Crea un oggetto con tutti i dati del form
        const formData = {
            title,
            rooms_number: roomsNumber,
            beds: bedsNumber,
            bathrooms: bathroomsNumber,
            square_meters: squareMeters,
            address,
            city,
            picture_url,
            description,
            services: selectedServices
        };

        // Log dei dati prima dell'invio
        console.log("Form Data in Submit: ", formData);

        // Usando .then() per gestire la promise
        fetch('http://localhost:3002/apartments/addapartment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
                setSuccessMessage('Apartment successfully added!');
                resetForm();
            })
            .catch((error) => {
                console.error('Errore:', error);
                setErrorMessage('Error with server, please try again');
            });

    };

    return (
        <div className="container py-5">
            <form className="row g-4 shadow-lg p-4 rounded" onSubmit={handleSubmit}>
                <h1 className='fw-bold'>Add your apartment</h1>
                <div className="col-12">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='example Appartamento Cagliari con vista mare'
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="rooms" className="form-label">Rooms</label>
                    <input
                        type="number"
                        className="form-control form-control-lg"
                        id="rooms"
                        name="rooms"
                        value={rooms_number}
                        onChange={(e) => setRooms_number(e.target.value)}
                        placeholder='example 3'
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="beds" className="form-label">Beds</label>
                    <input
                        type="number"
                        className="form-control form-control-lg"
                        id="beds"
                        name="beds"
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        placeholder='example 3'
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                    <input
                        type="number"
                        className="form-control form-control-lg"
                        id="bathrooms"
                        name="bathrooms"
                        value={bathrooms}
                        placeholder='example 2'
                        onChange={(e) => setBathrooms(e.target.value)}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="square_meters" className="form-label">Square Meters</label>
                    <input
                        type="number"
                        className="form-control form-control-lg"
                        id="square_meters"
                        name="square_meters"
                        value={square_meters}
                        onChange={(e) => setSquare_meters(e.target.value)}
                        placeholder=' example 180'
                        required
                    />
                </div>
                <div className="col-md-7">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='example Via Chiaia'
                        required
                    />
                </div>
                <div className="col-md-5">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="city"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='example Napoli'
                        required
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control form-control-lg"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Describe your apartment, at least 5 characters required'
                        required
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="picture_url" className="form-label">insert image of the apartment</label>
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="picture_url"
                        name="picture_url"
                        value={picture_url}
                        onChange={(e) => setPicture_url(e.target.value)}
                        placeholder="https://example.com/"
                        required
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">Services</label>
                    <div className="d-flex flex-wrap mb-4 gap-2">
                        {servicesList.map(service => (
                            <div key={service.id} className="form-check col-12 col-md-2 d-flex align-items-center">
                                <input
                                    className="form-check-input me-2"
                                    type="checkbox"
                                    value={service.id}
                                    id={`service-${service.id}`}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor={`service-${service.id}`}>
                                    {service.icon} {service.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary me-3 col-12 col-md-2">Add Apartment</button>
                    {errorMessage && <span className='text-danger'>{errorMessage}</span>}
                    {successMessage && <span className='text-success'>{successMessage}</span>}
                </div>
            </form>
        </div>

    );
}
