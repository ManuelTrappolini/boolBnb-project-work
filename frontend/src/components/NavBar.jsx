import React, { useState } from 'react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Show overlay and login module
    const handleLoginClick = (e) => {
        e.preventDefault();
        setOverlayVisible(true);
        setShowLoginForm(true);
        setShowRegisterForm(false);  // Ensure register form is hidden when login is clicked
    };

    // Show overlay and register module
    const handleRegisterClick = (e) => {
        e.preventDefault();
        setOverlayVisible(true);
        setShowLoginForm(false);  // Ensure login form is hidden when register is clicked
        setShowRegisterForm(true);
    };

    // Hide Overlay and forms
    const closeOverlay = () => {
        setOverlayVisible(false);
        setShowLoginForm(false);
        setShowRegisterForm(false);
    };

    return (
        <nav style={styles.navbar}>
            {/* Overlay */}
            {overlayVisible && (
                <div style={styles.overlay} onClick={closeOverlay}></div>
            )}

            {/* Login Module */}
            {overlayVisible && showLoginForm && (
                <div style={styles.loginFormContainer}>
                    <div style={styles.loginForm}>
                        <h2 style={styles.loginTitle}>Login</h2>
                        <form>
                            <div style={styles.formGroup}>
                                <label htmlFor="email" style={styles.label}>Email</label>
                                <input type="email" id="email" name="email" style={styles.input} required />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="password" style={styles.label}>Password</label>
                                <input type="password" id="password" name="password" style={styles.input} required />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit" style={styles.submitButton}>Log In</button>
                                <button style={styles.closeButton} onClick={closeOverlay}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Register Module */}
            {overlayVisible && showRegisterForm && (
                <div style={styles.loginFormContainer}>
                    <div style={styles.loginForm}>
                        <h2 style={styles.loginTitle}>Register</h2>
                        <form>
                            <div style={styles.formGroup}>
                                <label htmlFor="email" style={styles.label}>Email</label>
                                <input type="email" id="email" name="email" style={styles.input} required />
                            </div>
                            <div style={styles.formGroup}>
                                <label htmlFor="password" style={styles.label}>Password</label>
                                <input type="password" id="password" name="password" style={styles.input} required />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="submit" style={styles.submitButton}>Register</button>
                                <button style={styles.closeButton} onClick={closeOverlay}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Right Navbar */}
            <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyleType: 'none' }}>
                <li style={{ ...styles.navItem, position: 'relative' }} onClick={toggleDropdown}>
                    <a href="#" style={styles.navLink}>
                        <i className="bi bi-person" style={{ fontSize: '25px' }}></i>
                    </a>
                    {isDropdownOpen && (
                        <ul style={styles.dropdownMenu}>
                            <li><a href="#" style={styles.dropdownItem} onClick={handleLoginClick}>Login</a></li>
                            <li><a href="#" style={styles.dropdownItem} onClick={handleRegisterClick}>Register</a></li>
                        </ul>
                    )}
                </li>

                <li style={styles.navItem}>
                    <a href="/apartments/addapartment" style={styles.navLink}>Add your Apartment</a>
                </li>

                <li style={styles.navItem}>
                    <a href="/contact" style={styles.navLink}>Contact us</a>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: 'black',
        padding: '10px 20px',
    },
    navItem: {
        marginRight: '20px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        backgroundColor: 'white',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        listStyleType: 'none',
        padding: '10px 0',
    },
    dropdownItem: {
        padding: '8px 20px',
        textDecoration: 'none',
        color: 'black',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
    loginFormContainer: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1001,
        width: '300px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    loginTitle: {
        marginBottom: '20px',
        textAlign: 'center',
        color: 'black',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: 'black',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        alignSelf: 'center'
    },
    closeButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        alignSelf: 'center',
    },
};

export default Navbar;
