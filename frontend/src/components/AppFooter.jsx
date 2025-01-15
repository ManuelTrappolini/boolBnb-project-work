export default function AppFooter() {

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
                                        Speak with Us
                                    </h3>
                                </li>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="">About Us</a>
                                </li>
                                <li>
                                    <a href="">Contact</a>
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
                                <li><a href="">Webinars</a></li>
                                <li><a href="">Resources</a></li>
                                <li><a href="">FAQs</a></li>
                                <li><a href="">Events</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </footer >

        </>
    )
}