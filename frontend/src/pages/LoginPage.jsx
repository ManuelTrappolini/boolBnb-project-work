import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'password123') {
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 login-container">
            <div className="login-box p-4 shadow-lg rounded-lg">
                <h2 className="text-center text-white mb-4">Login</h2>
                <form onSubmit={handleLoginSubmit}>
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
                        <button type="submit" className="btn btn-primary w-100 py-3 btn-style">Log in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
