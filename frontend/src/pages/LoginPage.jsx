import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        // Reset degli errori all'inizio della validazione
        setErrors({ username: '', password: '' });

        // Validazione dei campi
        let formIsValid = true;
        let newErrors = { username: '', password: '' };

        if (username.trim() === '') {
            newErrors.username = 'Username is required';
            formIsValid = false;
        }

        if (password.trim() === '') {
            newErrors.password = 'Password is required';
            formIsValid = false;
        }

        if (!formIsValid) {
            setErrors(newErrors);
            return;
        }

        // Esegui il login solo se la validazione ha successo
        if (username === 'admin' && password === 'password123') {
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    // Gestori di cambio per i campi, che rimuovono l'errore quando l'utente inizia a digitare
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value.trim() !== '') {
            setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.trim() !== '') {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 login-container">
            <div className="login-box p-4 shadow-lg rounded-lg">
                <h2 className="text-center text-white mb-4">Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    {/* Input di Username */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            className="form-control my-3 py-3 input-style"
                        />
                        {/* Messaggio di errore sotto il campo */}
                        {errors.username && <div className="text-danger mt-1">{errors.username}</div>}
                    </div>

                    {/* Input di Password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control my-3 py-3 input-style"
                        />
                        {/* Messaggio di errore sotto il campo */}
                        {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
                    </div>

                    <div className="d-flex gap-3">
                        <button type="submit" className="btn btn-primary w-100 py-3 btn-style">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
