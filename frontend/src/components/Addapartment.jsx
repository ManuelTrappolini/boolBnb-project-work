import React, { useState } from 'react';
import { FaFan, FaShower, FaBed, FaAccessibleIcon, FaUtensils, FaParking, FaPaw, FaTree, FaSmoking, FaTv, FaWifi, FaExclamationCircle } from 'react-icons/fa';

export default function AddApartment() {
    const [title, setTitle] = useState('');
    const [rooms_number, setRooms_number] = useState('');
    const [beds, setBeds] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [square_meters, setSquare_meters] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [picture_file, setPicture_file] = useState('');
    const [description, setDescription] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [picturePreview, setPicturePreview] = useState('');
    const maxDescriptionLength = 500;

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
        setPicture_file('');
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
    };

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
        if (description.length < 15 || description.length > maxDescriptionLength) {
            errors.push({ field: 'description', message: `The description must be at least 15 characters long and no longer than ${maxDescriptionLength} characters.` });
        }
        else if (description.length < 5) errors.push({ field: 'description', message: 'Description must be at least 5 characters long.' });

        // Se ci sono errori, mostriamo il messaggio di errore
        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }

        // Se non ci sono errori, resettiamo gli errori e inviamo il form
        setErrorMessages([]);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('rooms_number', parseInt(rooms_number));
        formData.append('beds', parseInt(beds));
        formData.append('bathrooms', parseInt(bathrooms));
        formData.append('square_meters', parseInt(square_meters));
        formData.append('address', address);
        formData.append('city', city);
        formData.append('picture_file', picture_file);
        formData.append('description', description);
        formData.append('services', JSON.stringify(selectedServices));

        const token = localStorage.getItem('authToken');  // Assicurati che il token sia salvato correttamente

        // Controlla se il token è presente
        if (!token) {
            console.log("No token available!");
            return;  // Puoi mostrare un messaggio di errore o fare qualcosa se il token manca
        }

        // Simula l'invio dei dati al backend
        fetch('http://localhost:3002/apartments/addapartment', {
            method: 'POST',

            headers: {

                'Authorization': `Bearer ${token}`
            },
            body: formData,

        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Response data: ", data);
                // Nascondi il form e mostra il messaggio di successo
                setIsFormVisible(false);
                setSuccessMessage('✅Form submitted successfully!');
                setPicturePreview('');

                setTimeout(() => {
                    setIsFormVisible(true);
                    setSuccessMessage('');
                    resetForm();
                }, 3000);
            })
            .catch((error) => {
                setErrorMessages([{ field: 'server', message: 'Error with server, please try again' }]);
            });
    };

    const getInputClass = (field) => {
        // Verifica se l'input ha errori
        return errorMessages.some(error => error.field === field) ? 'is-invalid' : '';
    };

    const getErrorMessage = (field) => {
        // Restituisce il messaggio di errore per un campo specifico
        const error = errorMessages.find(error => error.field === field);
        return error ? error.message : '';
    };

    const handleChange = (field, setter) => (e) => {
        setter(e.target.value);

        // Rimuovi gli errori per il campo specifico
        setErrorMessages((prevErrors) =>
            prevErrors.filter((error) => error.field !== field)
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPicture_file(file);
        const previewUrl = URL.createObjectURL(file);
        setPicturePreview(previewUrl);
    };

    return (
        <div className="container py-5">
            {isFormVisible ? (
                <form className="row g-4 shadow-lg p-4 rounded" onSubmit={handleSubmit}>
                    <h1 className='fw-bold'>Add your apartment</h1>

                    <div className="col-12">
                        <label htmlFor="title" className="form-label">Title*</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control ${getInputClass('title')}`}
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleChange('title', setTitle)}
                                placeholder='e.g. Appartamento Cagliari con vista mare'
                            />
                            {getErrorMessage('title') && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                                    <FaExclamationCircle className="text-danger" />
                                </div>
                            )}
                        </div>
                        {getErrorMessage('title') && <div className="text-danger">{getErrorMessage('title')}</div>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="rooms" className="form-label">Rooms*</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className={`form-control  ${getInputClass('rooms_number')}`}
                                id="rooms"
                                name="rooms"
                                value={rooms_number}
                                onChange={handleChange('rooms_number', setRooms_number)}
                                placeholder='e.g. 3'
                                min="1"
                            />
                            {getErrorMessage('rooms_number') && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                                    <FaExclamationCircle className="text-danger" />
                                </div>
                            )}
                        </div>
                        {getErrorMessage('rooms_number') && <div className="text-danger">{getErrorMessage('rooms_number')}</div>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="beds" className="form-label">Beds*</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className={`form-control ${getInputClass('beds')}`}
                                id="beds"
                                name="beds"
                                value={beds}
                                onChange={handleChange('beds', setBeds)}
                                placeholder='e.g. 3'
                                min="1"
                            />
                            {getErrorMessage('beds') && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                                    <FaExclamationCircle className="text-danger" />
                                </div>
                            )}
                        </div>
                        {getErrorMessage('beds') && <div className="text-danger">{getErrorMessage('beds')}</div>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="bathrooms" className="form-label">Bathrooms*</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className={`form-control  ${getInputClass('bathrooms')}`}
                                id="bathrooms"
                                name="bathrooms"
                                value={bathrooms}
                                onChange={handleChange('bathrooms', setBathrooms)}
                                placeholder='e.g. 2'
                                min="1"
                            />
                            {getErrorMessage('bathrooms') && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                                    <FaExclamationCircle className="text-danger" />
                                </div>
                            )}
                        </div>
                        {getErrorMessage('bathrooms') && <div className="text-danger">{getErrorMessage('bathrooms')}</div>}
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="square_meters" className="form-label">Square Meters*</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className={`form-control  ${getInputClass('square_meters')}`}
                                id="square_meters"
                                name="square_meters"
                                value={square_meters}
                                onChange={handleChange('square_meters', setSquare_meters)}
                                placeholder='e.g. 180'
                                min="1"
                            />
                            {getErrorMessage('square_meters') && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                                    <FaExclamationCircle className="text-danger" />
                                </div>
                            )}
                        </div>
                        {getErrorMessage('square_meters') && <div className="text-danger">{getErrorMessage('square_meters')}</div>}
                    </div>

                    <div className="col-md-7">
                        <label htmlFor="address" className="form-label">Address*</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control  ${getInputClass('address')}`}
                                id="address"
                                name="address"
                                value={address}
                                onChange={handleChange('address', setAddress)}
                                placeholder='e.g. Via Chiaia'
                                autoComplete='off'
                            />
                            {getErrorMessage('address') && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                                    <FaExclamationCircle className="text-danger" />
                                </div>
                            )}
                        </div>
                        {getErrorMessage('address') && <div className="text-danger">{getErrorMessage('address')}</div>}
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="city" className="form-label">City*</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className={`form-control  ${getInputClass('city')}`}
                                id="city"
                                name="city"
                                value={city}
                                onChange={handleChange('city', setCity)}
                                placeholder='e.g. Napoli'
                                autoComplete='off'
                            />
                            {getErrorMessage('city') && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                                    <FaExclamationCircle className="text-danger" />
                                </div>
                            )}
                        </div>
                        {getErrorMessage('city') && <div className="text-danger">{getErrorMessage('city')}</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="description" className="form-label">Description*</label>
                        <div className="input-group">
                            <textarea
                                className={`form-control ${getInputClass('description')}`}
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleChange('description', setDescription)}
                                placeholder='Describe your apartment, at least 5 characters required'
                            />

                            {getErrorMessage('description') && (
                                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                                    <FaExclamationCircle className="text-danger" />
                                </div>
                            )}
                        </div>
                        <small>{description.length}/{maxDescriptionLength} characters</small>
                        {getErrorMessage('description') && <div className="text-danger">{getErrorMessage('description')}</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="picture_file" className="form-label">Upload image of the apartment*</label>
                        <input
                            type="file"
                            className={`form-control ${getInputClass('picture_file')}`}
                            id="picture_file"
                            name="picture_file"
                            onChange={handleFileChange}
                        />
                        {getErrorMessage('picture_file') && <div className="text-danger">{getErrorMessage('picture_file')}</div>}
                    </div>
                    {/* Preview dell'immagine */}
                    {picturePreview && (
                        <div className="mt-3">
                            <h5>Image Preview:</h5>
                            <img
                                src={picturePreview}
                                alt="Preview"
                                className="img-fluid"
                                style={{ maxHeight: '300px', objectFit: 'cover' }}
                            />
                        </div>
                    )}
                    <div className="col-12">
                        <label htmlFor="services" className="form-label">Select Services*</label>
                        <div className="d-flex flex-wrap gap-3">
                            {servicesList.map((service) => (
                                <div className="form-check me-4 col-6 col-sm-4 col-md-3 col-lg-2 mb-3" key={service.id}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`service-${service.id}`}
                                        value={service.id}
                                        checked={selectedServices.includes(service.id)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor={`service-${service.id}`}>
                                        <span className="me-2">{service.icon}</span>
                                        {service.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {getErrorMessage('services') && <div className="text-danger">{getErrorMessage('services')}</div>}
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary me-3 col-12 col-md-2">Add Apartment</button>

                    </div>
                </form>
            ) : (
                <div className="alert alert-success fw-bold" role="alert">
                    {successMessage}
                </div>
            )}
        </div>
    );
}
