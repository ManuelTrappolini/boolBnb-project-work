import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { login } = useAuth(); // Usa il contesto per la funzione login

    const validateForm = () => {
        const validationErrors = [];

        if (!username.trim()) {
            validationErrors.push({ field: 'username', message: 'Username is required.' });
        }

        if (!password) {
            validationErrors.push({ field: 'password', message: 'Password is required.' });
        }

        return validationErrors;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:3002/apartments/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Invalid credentials');
            }

            const data = await response.json();
            if (data.token) {
                console.log('Login successful');
                login(data.token);  // Usa il contesto per il login
                navigate('/');
            }
        } catch (error) {
            setErrors([{ field: 'api', message: error.message }]);
        }
    };

    const handleInputChange = (field, value) => {
        switch (field) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
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
        <div className='d-flex'>
            <div className="col-12 bg-photo d-flex pb-5">
                <div className="bg-overlay"></div>
                <div className="bg-content col-12 d-flex py-5 px-2 p-md-5 justify-content-center align-items-center mt-2 mb-5">
                    <div className="col-12 col-lg-4 bg-white text-black rounded mb-5">
                        <div className="p-5">
                            <h2>Login</h2>
                            <span>Enter your credentials to login</span>
                            <form onSubmit={handleLoginSubmit} className='mt-4'>
                                {/* Username */}
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fw-medium">Username *</label>
                                    <input
                                        type="text"
                                        id="username"
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
                                    <label htmlFor="password" className="form-label fw-medium">Password *</label>
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

                                <div className="d-flex gap-3">
                                    <button type="submit" className="btn btn-primary w-100 py-3 btn-style">Log in</button>
                                </div>

                                {getErrorMessage('api') && (
                                    <div className="text-danger small mt-2">{getErrorMessage('api')}</div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
