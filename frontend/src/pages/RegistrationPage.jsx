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
        <div className="d-flex justify-content-center align-items-center min-vh-100 registration-container">
            <div className="login-box p-4 shadow-lg rounded-lg">
                <h2 className="text-center text-white mb-4">Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control my-3 py-3 input-style"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control my-3 py-3 input-style"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control my-3 py-3 input-style"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control my-3 py-3 input-style"
                        />
                    </div>
                    <div className="d-flex gap-3">
                        <button type="submit" className="btn btn-primary w-100 py-3 btn-style">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

