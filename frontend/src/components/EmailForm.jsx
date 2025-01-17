import React, { useState, forwardRef } from 'react';
import { useParams } from 'react-router';

const FormEmail = forwardRef((props, ref) => {
    const [name, setName] = useState('');
    const [applicantEmail, setApplicantEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Effettua la validazione
        const errors = [];
        if (!name) errors.push({ field: 'name', message: 'Name is required.' });
        if (!applicantEmail) errors.push({ field: 'applicantEmail', message: 'Email is required.' });
        if (!subject) errors.push({ field: 'subject', message: 'Subject is required.' });
        if (!text) errors.push({ field: 'text', message: 'Message is required.' });

        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }

        try {
            // Invia la richiesta POST al backend con `fetch`
            const response = await fetch(`http://localhost:3002/apartments/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Imposta il tipo di contenuto
                },
                body: JSON.stringify({
                    name,
                    applicant_email: applicantEmail,
                    subject,
                    text,
                }),
            });

            // Gestisci la risposta
            if (response.ok) {
                const responseData = await response.json();
                setSuccessMessage('Your message has been sent successfully!');

                // Nascondi il messaggio di successo dopo 3 secondi
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);

                // Svuota i campi del form
                setName('');
                setApplicantEmail('');
                setSubject('');
                setText('');
            } else {
                const errorData = await response.json();
                setErrorMessages([{ message: errorData.error || 'Failed to send the message.' }]);
            }
        } catch (error) {
            console.error('Error during the fetch:', error);
            setErrorMessages([{ message: 'Failed to send the message. Please try again later.' }]);
        }
    };

    const handleChange = (field, setter) => (e) => {
        setter(e.target.value);
        // Rimuovi l'errore per il campo modificato
        setErrorMessages((prevErrors) =>
            prevErrors.filter((error) => error.field !== field)
        );
    };

    const getInputClass = (field) => {
        const hasError = errorMessages.some((err) => err.field === field);
        return hasError ? 'is-invalid' : '';
    };

    const getErrorMessage = (field) => {
        const error = errorMessages.find((err) => err.field === field);
        return error ? error.message : null;
    };

    return (
        <>
            <div ref={ref} id="emailForm" className='mb-4'></div>
            <div className="container py-5">
                <form className="row g-4 shadow-lg p-4 rounded" onSubmit={handleSubmit}>
                    <h3 className="fw-bold">Contact the Apartment Owner</h3>

                    <div className="col-12">
                        <label htmlFor="name" className="form-label">Your Name*</label>
                        <input
                            type="text"
                            className={`form-control form-control-lg ${getInputClass('name')}`}
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange('name', setName)} // Aggiungi onChange
                            placeholder="Enter your full name"
                        />
                        {getErrorMessage('name') && <div className="text-danger">{getErrorMessage('name')}</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="applicantEmail" className="form-label">Your Email*</label>
                        <input
                            type="email"
                            className={`form-control form-control-lg ${getInputClass('applicantEmail')}`}
                            id="applicantEmail"
                            name="applicantEmail"
                            value={applicantEmail}
                            onChange={handleChange('applicantEmail', setApplicantEmail)} // Aggiungi onChange
                            placeholder="Enter your email"
                        />
                        {getErrorMessage('applicantEmail') && <div className="text-danger">{getErrorMessage('applicantEmail')}</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="subject" className="form-label">Subject*</label>
                        <input
                            type="text"
                            className={`form-control form-control-lg ${getInputClass('subject')}`}
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={handleChange('subject', setSubject)} // Aggiungi onChange
                            placeholder="Enter the subject"
                        />
                        {getErrorMessage('subject') && <div className="text-danger">{getErrorMessage('subject')}</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="text" className="form-label">Your Message*</label>
                        <textarea
                            className={`form-control form-control-lg ${getInputClass('text')}`}
                            id="text"
                            name="text"
                            value={text}
                            onChange={handleChange('text', setText)} // Aggiungi onChange
                            placeholder="Enter your message"
                        />
                        {getErrorMessage('text') && <div className="text-danger">{getErrorMessage('text')}</div>}
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary col-12 col-md-2">Send Message</button>
                    </div>

                    {errorMessages.length > 0 && (
                        <div className="text-danger mt-3">
                            <ul>
                                {errorMessages.map((msg, index) => (
                                    <li key={index}>{msg.message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {successMessage && (
                        <div className="alert alert-success mt-3" role="alert">
                            {successMessage}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
});

export default FormEmail;
