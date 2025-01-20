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

    return (
        <nav>
            <div className="menu">
                <ul className='d-flex m-0 list-unstyled gap-3'>
                    <li>
                        <Link className='text-white pe-3' to={'/search'}>Search Appartment</Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link className='text-white' to='/apartments/addapartment'>Add your Apartment</Link>
                        </li>
                    )}
                    <li onClick={toggleDropdown}>
                        <Link to="#" className='text-white'>
                            <i className="bi bi-person"></i>
                        </Link>
                    </li>

                    {isDropdownOpen && (
                        <div className="drop rounded">
                            <ul className='d-flex flex-column m-0 p-0 list-unstyled'>
                                {!isLoggedIn ? (
                                    <>
                                        <li>
                                            <Link to="/login" className='text-white'>Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/register" className='text-white'>Register</Link>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <div onClick={logout} className="text-white">Logout</div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </ul>
            </div>

            <div className='menu-responsive'>
                <i className={`bi ${menuOpen ? 'bi-x' : 'bi-list'} text-white`} onClick={HamburgerToggle}></i>

                {menuOpen && (
                    <div className='d-flex rounded' id='label-menu'>
                        <ul className='d-flex flex-column m-0 p-0 list-unstyled'>
                            <li>
                                <Link className='text-white' to='/apartments/addapartment'>Add your Apartment</Link>
                            </li>
                            <li>
                                <Link className='text-white' to='/search'>Search Apartments</Link>
                            </li>
                            <hr className='p-0 my-3' />
                            {!isLoggedIn ? (
                                <>
                                    <li>
                                        <Link to="/login" className='text-white'>Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className='text-white'>Register</Link>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button onClick={logout} className="text-white">Logout</button>
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
