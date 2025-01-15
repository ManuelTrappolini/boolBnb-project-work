import React, { useState } from 'react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)

    function HamburgerToggle() {
        setMenuOpen(!menuOpen)

    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
        <nav>

            <div className="menu">
                <ul className='d-flex m-0 list-unstyled gap-3'>
                    <li >
                        <a href="/apartments/addapartment" className='text-white' >Add your Apartment</a>
                    </li>

                    <li >
                        <a href="/contact" className='text-white' >Contact us</a>
                    </li>

                    <li onClick={toggleDropdown}>
                        <a href="#" className='text-white'>
                            <i className="bi bi-person"></i>
                        </a>
                    </li>

                    {isDropdownOpen && (
                        <div className="drop rounded">
                            <ul className='d-flex flex-column m-0 p-0 list-unstyled'>
                                <li>
                                    <a href="#" className='text-white' onClick={handleLoginClick}>Login</a>
                                </li>
                                <li>
                                    <a href="#" className='text-white' onClick={handleRegisterClick}>Register</a>
                                </li>
                            </ul>
                        </div>
                    )}

                </ul>
            </div>

            <div className='menu-responsive'>
                <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'} text-white`} onClick={HamburgerToggle}></i>

                {menuOpen &&
                    <div className='d-flex rounded' id='label-menu'>
                        <ul className='d-flex flex-column m-0 p-0 list-unstyled'>
                            <li >
                                <a href="/apartments/addapartment" className='text-white' >Add your Apartment</a>
                            </li>

                            <li >
                                <a href="/contact" className='text-white' >Contact us</a>
                            </li>

                            <hr className='p-0 my-3' />

                            <li>
                                <a href="#" className='text-white' onClick={handleLoginClick}>Login</a>
                            </li>
                            <li>
                                <a href="#" className='text-white' onClick={handleRegisterClick}>Register</a>
                            </li>

                        </ul>
                    </div>
                }
            </div>

            {overlayVisible && (
                <div className='overlay' onClick={closeOverlay}></div>
            )}

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
                    <div className='rounded py-4 px-5 w-25'>
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


        </nav>
    );
};

export default Navbar;
