import { useState } from 'react';

export default function AddReview({ apartmentId, onReviewSubmit }) {

    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [description, setDescription] = useState('');
    const [daysOfStay, setDaysOfStay] = useState('');
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const maxDescriptionLength = 500;

    /* validate form */
    const validateForm = () => {
        const errors = {};
        if (!authorName.trim()) errors.authorName = 'Name is required.';
        if (!authorEmail.trim()) {
            errors.authorEmail = 'Email is required.';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(authorEmail)) errors.authorEmail = 'Please enter a valid email address.';
        }
        if (!description.trim()) {
            errors.description = 'Description is required.';
        } else if (description.trim().length < 15 || description.trim().length > maxDescriptionLength) {
            errors.description = `The description must be at least 15 characters long and no longer than ${maxDescriptionLength} characters.`;
        }
        if (!daysOfStay || isNaN(daysOfStay) || daysOfStay <= 0) {
            errors.daysOfStay = 'Please enter a valid number.';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            author_name: authorName,
            author_email: authorEmail,
            description,
            days_of_stay: parseInt(daysOfStay, 10),
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
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to add review');
            }

            setSuccessMessageVisible(true);
            setErrorMessage('');
            setFieldErrors({});
            setAuthorName('');
            setAuthorEmail('');
            setDescription('');
            setDaysOfStay('');

            setTimeout(() => setSuccessMessageVisible(false), 10000);

            if (onReviewSubmit) {
                onReviewSubmit();
            }
        } catch (error) {
            setErrorMessage('Review has not been added, please try again.');
            setSuccessMessageVisible(false);
        }
    };

    return (
        <div className="container px-0">
            {/* Overlay for success message */}
            {successMessageVisible ? (

                <div className="d-flex align-items-center alert alert-success" role="alert">
                    <span className="text-success me-2 fs-5">
                        ✅
                    </span>
                    <p className="text-success m-0 fw-bold fs-6">
                        Review added successfully!
                    </p>
                </div>

            ) : (
                <>
                    <h3 className="fw-bold mb-4">Add a Review</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="mb-3 col-12 col-md-5">
                                <label htmlFor="authorName" className="form-label">Name*</label>
                                <input
                                    className={`form-control ${fieldErrors.authorName ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="authorName"
                                    value={authorName}
                                    placeholder="e.g. John Smith"
                                    onChange={(e) => setAuthorName(e.target.value)}
                                    aria-invalid={!!fieldErrors.authorName}
                                    aria-describedby="authorNameError"
                                />
                                {fieldErrors.authorName && <div id="authorNameError" className="invalid-feedback">{fieldErrors.authorName}</div>}
                            </div>

                            <div className="mb-3 col-12 col-md-5">
                                <label htmlFor="authorEmail" className="form-label">Email*</label>
                                <input
                                    className={`form-control ${fieldErrors.authorEmail ? 'is-invalid' : ''}`}
                                    type="email"
                                    id="authorEmail"
                                    value={authorEmail}
                                    placeholder="e.g. example@gmail.com"
                                    onChange={(e) => setAuthorEmail(e.target.value)}
                                    aria-invalid={!!fieldErrors.authorEmail}
                                    aria-describedby="authorEmailError"
                                    autoComplete="off"
                                />
                                {fieldErrors.authorEmail && <div id="authorEmailError" className="invalid-feedback">{fieldErrors.authorEmail}</div>}
                            </div>

                            <div className="mb-3 col-12 col-md-2">
                                <label htmlFor="daysOfStay" className="form-label">Days of Stay</label>
                                <input
                                    className={`form-control ${fieldErrors.daysOfStay ? 'is-invalid' : ''}`}
                                    type="number"
                                    id="daysOfStay"
                                    value={daysOfStay}
                                    placeholder="Enter a number"
                                    onChange={(e) => setDaysOfStay(e.target.value)}
                                    aria-invalid={!!fieldErrors.daysOfStay}
                                    aria-describedby="daysOfStayError"
                                    min="1"
                                />
                                {fieldErrors.daysOfStay && <div id="daysOfStayError" className="invalid-feedback">{fieldErrors.daysOfStay}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description*</label>
                            <textarea
                                className={`form-control ${fieldErrors.description ? 'is-invalid' : ''}`}
                                id="description"
                                value={description}
                                rows="3"
                                placeholder="Describe your stay..."
                                onChange={(e) => setDescription(e.target.value)}
                                aria-invalid={!!fieldErrors.description}
                                aria-describedby="descriptionError"
                            ></textarea>
                            <div className="d-flex justify-content-between mt-1">
                                <small id="descriptionError" className="text-danger">
                                    {fieldErrors.description}
                                </small>
                                <small>{description.length}/{maxDescriptionLength} characters</small>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <button type="submit" className="btn btn-primary me-3">Submit Review</button>
                            <div>
                                {errorMessage && <p role="alert" className="m-0 text-danger" >{errorMessage}</p>}
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    )
}
