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
    const [errorMessages, setErrorMessages] = useState([]);
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
        setErrorMessages([]);
    };

    const handleCheckboxChange = (e) => {
        const serviceId = parseInt(e.target.value);
        setSelectedServices(prevSelectedServices =>
            e.target.checked
                ? [...prevSelectedServices, serviceId]
                : prevSelectedServices.filter(id => id !== serviceId)
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = [];

        // Validazione campi
        if (title.trim() === '') errors.push({ field: 'title', message: 'Title is required.' });
        else if (title.length < 5) errors.push({ field: 'title', message: 'Title must be at least 5 characters long.' });

        if (rooms_number === '' || isNaN(rooms_number) || rooms_number <= 0) errors.push({ field: 'rooms_number', message: 'You must enter the number of rooms.' });
        if (beds === '' || isNaN(beds) || beds <= 0) errors.push({ field: 'beds', message: 'You must enter the number of beds.' });
        if (bathrooms === '' || isNaN(bathrooms) || bathrooms <= 0) errors.push({ field: 'bathrooms', message: 'You must enter the number of bathrooms.' });
        if (square_meters === '' || isNaN(square_meters) || square_meters <= 0) errors.push({ field: 'square_meters', message: 'You must enter the number of square meters.' });

        if (address.trim() === '') errors.push({ field: 'address', message: 'Address is required.' });
        else if (address.length < 5) errors.push({ field: 'address', message: 'Address must be at least 5 characters long.' });

        if (city.trim() === '') errors.push({ field: 'city', message: 'City is required.' });



        if (description.trim() === '') errors.push({ field: 'description', message: 'Description is required.' });
        else if (description.length < 5) errors.push({ field: 'description', message: 'Description must be at least 5 characters long.' });

        // Se ci sono errori, mostriamo il messaggio di errore
        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }

        // Se non ci sono errori, resettiamo gli errori e inviamo il form
        setErrorMessages([]);

        const formData = {
            title,
            rooms_number: parseInt(rooms_number),
            beds: parseInt(beds),
            bathrooms: parseInt(bathrooms),
            square_meters: parseInt(square_meters),
            address,
            city,
            picture_url,
            description,
            services: selectedServices
        };

        // Simula l'invio dei dati al backend
        fetch('http://localhost:3002/apartments/addapartment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                setSuccessMessage('Apartment successfully added!');
                resetForm();
            })
            .catch((error) => {
                setErrorMessages([{ field: 'server', message: 'Error with server, please try again' }]);
            });
    };

    const getInputClass = (field) => {
        // Verifica se l'input ha errori
        return errorMessages.some(error => error.field === field) ? 'input-error' : '';
    };

    const getErrorMessage = (field) => {
        // Restituisce il messaggio di errore per un campo specifico
        const error = errorMessages.find(error => error.field === field);
        return error ? error.message : '';
    };

    return (
        <div className="container py-5">
            <form className="row g-4 shadow-lg p-4 rounded" onSubmit={handleSubmit}>
                <h1 className='fw-bold'>Add your apartment</h1>

                <div className="col-12">
                    <label htmlFor="title" className="form-label">Title*</label>
                    <input
                        type="text"
                        className={`form-control form-control-lg ${getInputClass('title')}`}
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='example Appartamento Cagliari con vista mare'
                    />
                    {getErrorMessage('title') && <div className="text-danger">{getErrorMessage('title')}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="rooms" className="form-label">Rooms*</label>
                    <input
                        type="number"
                        className={`form-control form-control-lg ${getInputClass('rooms_number')}`}
                        id="rooms"
                        name="rooms"
                        value={rooms_number}
                        onChange={(e) => setRooms_number(e.target.value)}
                        placeholder='example 3'
                        min="1"
                    />
                    {getErrorMessage('rooms_number') && <div className="text-danger">{getErrorMessage('rooms_number')}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="beds" className="form-label">Beds*</label>
                    <input
                        type="number"
                        className={`form-control form-control-lg ${getInputClass('beds')}`}
                        id="beds"
                        name="beds"
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        placeholder='example 3'
                        min="1"
                    />
                    {getErrorMessage('beds') && <div className="text-danger">{getErrorMessage('beds')}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="bathrooms" className="form-label">Bathrooms*</label>
                    <input
                        type="number"
                        className={`form-control form-control-lg ${getInputClass('bathrooms')}`}
                        id="bathrooms"
                        name="bathrooms"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        placeholder='example 2'
                        min="1"
                    />
                    {getErrorMessage('bathrooms') && <div className="text-danger">{getErrorMessage('bathrooms')}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="square_meters" className="form-label">Square Meters*</label>
                    <input
                        type="number"
                        className={`form-control form-control-lg ${getInputClass('square_meters')}`}
                        id="square_meters"
                        name="square_meters"
                        value={square_meters}
                        onChange={(e) => setSquare_meters(e.target.value)}
                        placeholder='example 180'
                        min="1"
                    />
                    {getErrorMessage('square_meters') && <div className="text-danger">{getErrorMessage('square_meters')}</div>}
                </div>

                <div className="col-md-7">
                    <label htmlFor="address" className="form-label">Address*</label>
                    <input
                        type="text"
                        className={`form-control form-control-lg ${getInputClass('address')}`}
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='example Via Chiaia'
                        autoComplete='1'
                    />
                    {getErrorMessage('address') && <div className="text-danger">{getErrorMessage('address')}</div>}
                </div>

                <div className="col-md-5">
                    <label htmlFor="city" className="form-label">City*</label>
                    <input
                        type="text"
                        className={`form-control form-control-lg ${getInputClass('city')}`}
                        id="city"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder='example Napoli'
                        autoComplete='0'
                    />
                    {getErrorMessage('city') && <div className="text-danger">{getErrorMessage('city')}</div>}
                </div>

                <div className="col-12">
                    <label htmlFor="description" className="form-label">Description*</label>
                    <textarea
                        className={`form-control form-control-lg ${getInputClass('description')}`}
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Describe your apartment, at least 5 characters required'
                    />
                    {getErrorMessage('description') && <div className="text-danger">{getErrorMessage('description')}</div>}
                </div>

                <div className="col-12">
                    <label htmlFor="picture_url" className="form-label">Insert image of the apartment</label>
                    <input
                        type="text"
                        className={`form-control form-control-lg ${getInputClass('picture_url')}`}
                        id="picture_url"
                        name="picture_url"
                        value={picture_url}
                        onChange={(e) => setPicture_url(e.target.value)}
                        placeholder="https://example.com/"
                    />
                    {getErrorMessage('picture_url') && <div className="text-danger">{getErrorMessage('picture_url')}</div>}
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
                    {errorMessages.length > 0 && (
                        <div className="text-danger">
                            <ul>
                                {errorMessages.map((msg, index) => <li key={index}>{msg.message}</li>)}
                            </ul>
                        </div>
                    )}
                    {successMessage && <span className='text-success'>{successMessage}</span>}
                </div>
            </form>
        </div>
    );
}
