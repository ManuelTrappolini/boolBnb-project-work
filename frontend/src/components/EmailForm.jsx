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
    const maxTextLength = 500;


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation data
        const errors = [];
        if (!name) errors.push({ field: 'name', message: 'Name is required.' });
        if (!applicantEmail) errors.push({ field: 'applicantEmail', message: 'Email is required.' });
        if (!subject) errors.push({ field: 'subject', message: 'Subject is required.' });
        if (!text) errors.push({ field: 'text', message: 'Message is required.' });
        if (text.length < 15 || text.length > maxTextLength) {
            errors.push({ field: 'text', message: `The message must be at least 15 characters long and no longer than ${maxTextLength} characters.` });
        }
        if (errors.length > 0) {
            setErrorMessages(errors);
            return;
        }

        try {
            // Send request to backend with fetch
            const response = await fetch(`http://localhost:3002/apartments/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    applicant_email: applicantEmail,
                    subject,
                    text,
                }),
            });

            // Handle response

            if (response.ok) {
                const responseData = await response.json();
                setSuccessMessage('Your message has been sent successfully!');

                // Hide message after 2 sec

                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);

                // Empty form field
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

        // Remove error for fill form field
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
                            className={`form-control  ${getInputClass('name')}`}
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange('name', setName)}
                            placeholder="e.g. John Smith"
                        />
                        {getErrorMessage('name') && <div className="text-danger">{getErrorMessage('name')}</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="applicantEmail" className="form-label">Your Email*</label>
                        <input
                            type="email"
                            className={`form-control ${getInputClass('applicantEmail')}`}
                            id="applicantEmail"
                            name="applicantEmail"
                            value={applicantEmail}
                            onChange={handleChange('applicantEmail', setApplicantEmail)}
                            placeholder="e.g. example@gmail.com"
                        />
                        {getErrorMessage('applicantEmail') && <div className="text-danger">{getErrorMessage('applicantEmail')}</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="subject" className="form-label">Subject*</label>
                        <input
                            type="text"
                            className={`form-control ${getInputClass('subject')}`}
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={handleChange('subject', setSubject)}
                            placeholder="Enter the subject"
                        />
                        {getErrorMessage('subject') && <div className="text-danger">{getErrorMessage('subject')}</div>}
                    </div>

                    <div className="col-12">
                        <label htmlFor="text" className="form-label">Your Message*</label>
                        <textarea
                            className={`form-control  ${getInputClass('text')}`}
                            id="text"
                            name="text"
                            value={text}
                            onChange={handleChange('text', setText)}
                            placeholder="Enter your message"
                        />
                        <small>{text.length}/{maxTextLength} characters</small>
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
