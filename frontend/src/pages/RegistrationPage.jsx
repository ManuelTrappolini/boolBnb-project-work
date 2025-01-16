import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', { name, email, username, password });
        navigate('/login');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="rounded py-4 px-5 shadow-lg">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control my-2"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control my-2"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control my-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control my-2"
                    />
                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-success w-50">Register</button>
                        <button type="button" className="btn btn-danger w-50" onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
