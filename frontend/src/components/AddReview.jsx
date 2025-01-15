import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function AddReview() {
    const { apartmentId } = useParams(); // Ottieni apartmentId dai parametri URL
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [description, setDescription] = useState('');
    const [daysOfStay, setDaysOfStay] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /* validate form */
    const validateForm = () => {
        const errors = [];
        if (!authorName.trim()) errors.push('Name is required.');
        if (!authorEmail.trim()) errors.push('Email is required.');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(authorEmail)) errors.push('Please enter a valid email address.');
        if (!description.trim()) errors.push('Description is required.');
        if (!daysOfStay || isNaN(daysOfStay) || daysOfStay <= 0) errors.push('Please enter a valid number of days of stay.');
        if (errors.length > 0) {
            setErrorMessage('Data entered is invalid');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            author_name: authorName,
            author_email: authorEmail,
            description,
            days_of_stay: daysOfStay,
        };

        try {
            const response = await fetch(`http://localhost:3002/apartments/${apartmentId}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.text(); // Usa text() se non sei sicuro che sia JSON
                throw new Error(errorData || 'Failed to add review');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                setSuccessMessage('Review added successfully!');
            }

            setErrorMessage('');
            setAuthorName('');
            setAuthorEmail('');
            setDescription('');
            setDaysOfStay('');
        } catch (error) {
            setErrorMessage('Review has not been added');
            console.log(error.message);
            setSuccessMessage('');
        }
    };


    return (
        <div className="container">
            <div className='row'>
                <h3 className='fw-bold mb-4 px-0'>Add a Review</h3>

                {/* form */}
                <form onSubmit={handleSubmit} className='px-0'>
                    <div className="row">
                        <div className="mb-3 col-12 col-md-4">
                            <label htmlFor="authorName" className="form-label">Name</label>
                            <input
                                className="form-control"
                                placeholder="Mario Rossi"
                                type="text"
                                id="authorName"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-12 col-md-4">
                            <label htmlFor="authorEmail" className="form-label">Email</label>
                            <input
                                className="form-control"
                                placeholder="example@gmail.com"
                                type="email"
                                id="authorEmail"
                                value={authorEmail}
                                onChange={(e) => setAuthorEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 col-12 col-md-4">
                        <label htmlFor="daysOfStay" className="form-label">Days of Stay</label>
                        <input
                            className="form-control"
                            placeholder="5"
                            type="number"
                            id="daysOfStay"
                            value={daysOfStay}
                            onChange={(e) => setDaysOfStay(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="mb-3 col-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            placeholder="describe your journey..."
                            type="text"
                            id="description"
                            value={description}
                            rows="3"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className='btn btn-primary'>Submit Review</button>
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}
