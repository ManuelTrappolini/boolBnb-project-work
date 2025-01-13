import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Funzione per gestire l'apertura/chiusura del dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (

        <nav style={styles.navbar}>

            <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyleType: 'none' }}>

                <li style={{ ...styles.navItem, position: 'relative' }} onClick={toggleDropdown}>
                    <a href="#" style={styles.navLink}><i className="bi bi-person" style={{ fontSize: '25px' }}></i></a>
                    {isDropdownOpen && (
                        <ul style={styles.dropdownMenu}>
                            <li><a href="/login" style={styles.dropdownItem}>Login</a></li>
                            <li><a href="/register" style={styles.dropdownItem}>Register</a></li>

                        </ul>
                    )}
                </li>

                <li style={styles.navItem}>
                    <a href="/about" style={styles.navLink}>About</a>
                </li>

                <li style={styles.navItem}>
                    <a href="/contact" style={styles.navLink}>Contact</a>
                </li>

            </ul>

        </nav >

    );
}

// Stili per la navbar e il dropdown
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: 'black',
        color: '#fff',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    navList: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
    },
    navItem: {
        margin: '0 15px',
        position: 'relative',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: '0',
        backgroundColor: 'black',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        borderRadius: '5px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    dropdownItem: {
        padding: '10px 20px',
        color: '#fff',
        textDecoration: 'none',
        display: 'block',
    },
};
