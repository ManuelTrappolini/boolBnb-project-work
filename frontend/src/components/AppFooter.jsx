import { Link } from 'react-router';

export default function AppFooter() {

    return (
        <>
            <footer className='border-top'>
                <div className="container py-4">
                    <div className="row p-4" >
                        <div className="col-12 col-md-4">
                            <ul className="list-unstyled">
                                <li className="logo">
                                    <img src="/logo.png" alt="" />
                                </li>
                                <li>
                                    <div className="social d-flex pt-3">
                                        <a href="/"><i className="m-2 bi bi-facebook text-white"></i></a>
                                        <a href="/"><i className="m-2 bi bi-twitter text-white"></i></a>
                                        <a href="/"><i className="m-2 bi bi-instagram text-white"></i></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 ">
                            <ul className="list-unstyled p-0 ps-md-4 pt-md-2 border-left">
                                <li>
                                    <h3 className='text-white'>
                                        Site Map
                                    </h3>
                                </li>
                                <li className='pb-2'>
                                    <Link to="/" className='text-white border_btm bold'>Home</Link>
                                </li>
                                <li className='pb-2'>
                                    <Link to="/login" className='text-white border_btm bold'>Login</Link>
                                </li>
                                <li className='pb-2'>
                                    <Link to="/register" className='text-white border_btm bold'>Register</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4">
                            <ul className="list-unstyled p-0 ps-md-4 pt-md-2 border-left">
                                <li>
                                    <h3 className='text-white'>
                                        Learn More
                                    </h3>
                                </li>
                                <li className='pb-2'><a href="#" className='text-white border_btm bold'>About us</a></li>
                                <li className='pb-2'><a href="#" className='text-white border_btm bold'>FAQs</a></li>
                                <li className='pb-2'><a href="#" className='text-white border_btm bold'>Privicy policy</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </footer >

        </>
    )
}