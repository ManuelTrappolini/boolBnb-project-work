import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();

    function HamburgerToggle() {
        setMenuOpen(!menuOpen);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Funzione per chiudere il menu hamburger
    const closeMenu = () => {
        setMenuOpen(false);
        setIsDropdownOpen(false)

    };

    return (
        <nav>
            <div className="menu">
                <ul className='d-flex justify-content-center align-items-center m-0 list-unstyled gap-3'>
                    <li>
                        <Link className='text-white bold border_btm' to={'/search'} onClick={closeMenu}>Search Appartment</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link className='text-white bold border_btm' to='/apartments/addapartment' onClick={closeMenu}>Add your Apartment</Link>
                        </li>
                    )}
                    <li onClick={toggleDropdown}>
                        <Link to="#" className='text-white bold'>
                            <i className="bi bi-person-circle"></i>
                        </Link>
                    </li>

                    {isDropdownOpen && (
                        <div className="drop rounded shadow-lg">
                            <ul className='d-flex flex-column m-0 p-0 list-unstyled'>
                                {!isLoggedIn ? (
                                    <>
                                        <li>
                                            <Link to="/login" className='text-white bold border_btm' onClick={closeMenu}>Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/register" className='text-white bold border_btm' onClick={closeMenu}>Register</Link>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <span onClick={() => { logout(); closeMenu(); }} className="text-white bold border_btm logout">Logout</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </ul>
            </div>

            <div className='menu-responsive '>
                <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'} text-white`} onClick={HamburgerToggle}></i>

                {menuOpen && (
                    <div className='d-flex rounded shadow-lg' id='label-menu'>
                        <ul className='d-flex flex-column m-0 p-0 list-unstyled'>
                            {isLoggedIn && (
                                <li>
                                    <Link className='text-white bold border_btm' to='/apartments/addapartment' onClick={closeMenu}>Add your Apartment</Link>
                                </li>
                            )}
                            <li>
                                <Link className='text-white bold border_btm' to='/search' onClick={closeMenu}>Search Apartments</Link>
                            </li>
                            <hr className='p-0 my-3' />
                            {!isLoggedIn ? (
                                <>
                                    <li>
                                        <Link to="/login" className='text-white bold border_btm' onClick={closeMenu}>Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className='text-white bold border_btm' onClick={closeMenu}>Register</Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <span onClick={() => { logout(); closeMenu(); }} className="text-white bold border_btm">Logout</span>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
