import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const validateForm = () => {
        const validationErrors = [];

        if (!name.trim()) {
            validationErrors.push({ field: 'name', message: 'Name is required.' });
        }

        if (!email) {
            validationErrors.push({ field: 'email', message: 'Email is required.' });
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.push({ field: 'email', message: 'Invalid email format.' });
        }

        if (!username.trim()) {
            validationErrors.push({ field: 'username', message: 'Username is required.' });
        } else if (username.length < 3) {
            validationErrors.push({ field: 'username', message: 'Username must be at least 3 characters.' });
        }

        if (!password) {
            validationErrors.push({ field: 'password', message: 'Password is required.' });
        } else if (password.length < 6) {
            validationErrors.push({ field: 'password', message: 'Password must be at least 6 characters.' });
        }

        if (!confirmPassword) {
            validationErrors.push({ field: 'confirmPassword', message: 'Please confirm your password.' });
        } else if (password !== confirmPassword) {
            validationErrors.push({ field: 'confirmPassword', message: 'Passwords do not match.' });
        }

        if (!acceptTerms) {
            validationErrors.push({ field: 'acceptTerms', message: 'You must accept the terms and conditions.' });
        }

        return validationErrors;
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:3002/apartments/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed.');
            }

            const data = await response.json();

            if (data.success) {
                console.log('Registration successful:', data);
                navigate('/login');
            }
        } catch (error) {
            setErrors([{ field: 'api', message: error.message }]);
        }
    };

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'acceptTerms':
                setAcceptTerms(value);
                break;
            default:
                break;
        }
        setErrors((prevErrors) => prevErrors.filter((error) => error.field !== field));
    };

    const getInputClass = (field) => {
        return errors.some((error) => error.field === field) ? 'is-invalid' : '';
    };

    const getErrorMessage = (field) => {
        const error = errors.find((error) => error.field === field);
        return error ? error.message : '';
    };

    return (
        <div className='d-flex h-100'>
            <div className='bg-photo py-5 col-12'>
                <div className="bg-overlay"></div>
                <div className="bg-content d-flex py-5 px-2 p-md-5 align-items-center">
                    <div className=' d-none d-md-block col-lg-6 p-5'>
                        <h2 className='fw-bold text-white'>
                            Become an host! <br /> Share your space, grow your income...
                        </h2>
                        <p className='text-white fw-lighter mt-2'>
                            Unlock the potential of your space and connect with travelers worldwide
                        </p>
                    </div>
                    <div className="col-12 col-lg-6 bg-white text-black rounded">
                        <div className="p-4 p-md-5">
                            <h2>Registration</h2>
                            <span>Enter your details to register</span>
                            <form onSubmit={handleRegisterSubmit} className='mt-4'>
                                {/* Name */}
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-medium ">Name *</label>
                                    <input
                                        type="text"
                                        id='name'
                                        placeholder="e.g. Mario Rossi"
                                        value={name}
                                        autoComplete='off'
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className={`form-control py-3 input-style ${getInputClass('name')}`}
                                    />
                                    {getErrorMessage('name') && (
                                        <div className="text-danger small mt-1">{getErrorMessage('name')}</div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-medium ">Email *</label>
                                    <input
                                        type="email"
                                        id='email'
                                        placeholder="e.g. example@gmail.com"
                                        value={email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`form-control py-3 input-style ${getInputClass('email')}`}
                                        autoComplete='off'
                                    />
                                    {getErrorMessage('email') && (
                                        <div className="text-danger small mt-1">{getErrorMessage('email')}</div>
                                    )}
                                </div>

                                {/* Username */}
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fw-medium ">Username *</label>
                                    <input
                                        type="text"
                                        id='username'
                                        placeholder="e.g. Mario18"
                                        value={username}
                                        autoComplete='off'
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        className={`form-control py-3 input-style ${getInputClass('username')}`}
                                    />
                                    {getErrorMessage('username') && (
                                        <div className="text-danger small mt-1">{getErrorMessage('username')}</div>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="mb-3 position-relative">
                                    <label htmlFor="password" className="form-label fw-medium ">Password *</label>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`form-control py-3 input-style ${getInputClass('password')}`}
                                        autoComplete='off'
                                    />
                                    {!errors.some((error) => error.field === 'password') && (
                                        <div
                                            className="position-absolute top-eye end-0 translate-middle-y pe-3"
                                            onMouseDown={() => setPasswordVisible(true)}
                                            onMouseUp={() => setPasswordVisible(false)}
                                            onMouseLeave={() => setPasswordVisible(false)}
                                        >
                                            {passwordVisible ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                        </div>
                                    )}
                                    {getErrorMessage('password') && (
                                        <div className="text-danger small mt-1">{getErrorMessage('password')}</div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3 position-relative">
                                    <label htmlFor="confirm-password" className="form-label fw-medium ">Confirm Password *</label>
                                    <input
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        className={`form-control py-3 input-style ${getInputClass('confirmPassword')}`}
                                        autoComplete='off'
                                    />
                                    {!errors.some((error) => error.field === 'confirmPassword') && (
                                        <div
                                            className="position-absolute top-eye end-0 translate-middle-y pe-3"
                                            onMouseDown={() => setConfirmPasswordVisible(true)}
                                            onMouseUp={() => setConfirmPasswordVisible(false)}
                                            onMouseLeave={() => setConfirmPasswordVisible(false)}
                                        >
                                            {confirmPasswordVisible ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                        </div>
                                    )}
                                    {getErrorMessage('confirmPassword') && (
                                        <div className="text-danger small mt-1">{getErrorMessage('confirmPassword')}</div>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="mb-3">
                                    <input
                                        type="checkbox"
                                        id="acceptTerms"
                                        checked={acceptTerms}
                                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                                        className="me-2"
                                    />
                                    <label htmlFor="acceptTerms" className="form-label fw-medium">
                                        I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>.
                                    </label>
                                    {getErrorMessage('acceptTerms') && (
                                        <div className="text-danger small mt-1">{getErrorMessage('acceptTerms')}</div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="d-flex flex-column gap-3">
                                    <button type="submit" className="btn btn-primary w-100 py-3 btn-style">Register</button>
                                    <span className="text-center">
                                        Already registered? <Link to="/login" className="text-primary">Log in</Link>
                                    </span>
                                </div>

                                {/* Errori API */}
                                {getErrorMessage('api') && (
                                    <div className="text-danger small mt-3">{getErrorMessage('api')}</div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
