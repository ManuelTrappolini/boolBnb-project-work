import { Link } from 'react-router';
import React, { useState } from 'react';

export default function AppFooter() {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    // Show overlay and login module
    const handleLoginClick = (e) => {
        e.preventDefault();
        setOverlayVisible(true);
        setShowLoginForm(true);
        setShowRegisterForm(false);
    };

    // Show overlay and register module
    const handleRegisterClick = (e) => {
        e.preventDefault();
        setOverlayVisible(true);
        setShowLoginForm(false);
        setShowRegisterForm(true);
    };

    // Hide Overlay and forms
    const closeOverlay = () => {
        setOverlayVisible(false);
        setShowLoginForm(false);
        setShowRegisterForm(false);
    };

    return (
        <>
            <footer>
                <div className="container">
                    <div className="row p-4" >
                        <div className="col-12 col-md-4">
                            <ul className="list-unstyled">
                                <li className="logo">
                                    <img src="/logo.png" alt="" />
                                </li>
                                <li>
                                    <div className="social d-flex pt-3">
                                        <a href="/"><i className="m-2 bi bi-facebook"></i></a>
                                        <a href="/"><i className="m-2 bi bi-twitter"></i></a>
                                        <a href="/"><i className="m-2 bi bi-instagram"></i></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4">
                            <ul className="list-unstyled">
                                <li>
                                    <h3>
                                        Site Map
                                    </h3>
                                </li>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <Link to="#" className='text-white' onClick={handleLoginClick}>Login</Link>
                                </li>
                                <li>
                                    <Link to="#" className='text-white' onClick={handleRegisterClick}>Register</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4">
                            <ul className="list-unstyled">
                                <li>
                                    <h3>
                                        Learn More
                                    </h3>
                                </li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">FAQs</a></li>
                                <li><a href="#">Privicy policy</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Login Module */}
                {overlayVisible && showLoginForm && (
                    <div className='overlay d-flex flex-column justify-content-center align-items-center'>
                        <div className='rounded py-4 px-5'>
                            <h2 >Login</h2>
                            <form>
                                <div className="col-12 pt-2">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="username"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder='Mario'
                                        required
                                    />
                                </div>
                                <div className="col-12 pt-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                    />
                                </div>
                                <div className='py-2 d-flex gap-2'>
                                    <button className='btn btn-success w-50' type="submit" >Log in</button>
                                    <button className='btn btn-danger w-50' onClick={closeOverlay}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Register Module */}
                {overlayVisible && showRegisterForm && (
                    <div className='overlay d-flex flex-column justify-content-center align-items-center'>
                        <div id='registration' className='rounded py-4 px-5'>
                            <h2 >Register</h2>
                            <form>
                                <div className="col-12 pt-2">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder='Mario Rossi'
                                        required
                                    />
                                </div>
                                <div className="col-12 pt-2">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder='example@gmail.com'
                                        required
                                    />
                                </div>
                                <div className="col-12 pt-2">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder='Mario17'
                                        required
                                    />
                                </div>
                                <div className="col-12 pt-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                    />
                                </div>
                                <div className='py-2 d-flex gap-2'>
                                    <button className='btn btn-success w-50' type="submit" >Register</button>
                                    <button className='btn btn-danger w-50' onClick={closeOverlay}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </footer >

        </>
    )
}