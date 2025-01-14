export default function AppFooter() {

    return (
        <>
            <footer style={{ height: '200px', backgroundColor: 'black', color: 'white' }}>
                <div className="container">
                    <div className="row" >
                        <div className="col-4 pt-3">
                            <ul style={{ listStyleType: 'none' }}>
                                <li>
                                    <h3>
                                        BoolBnB
                                    </h3>
                                </li>
                                <li>
                                    <div className="social d-flex">
                                        <a style={{ textDecoration: 'none', color: 'white' }} href="/"><i className="m-2 bi bi-facebook"></i></a>
                                        <a style={{ textDecoration: 'none', color: 'white' }} href="/"><i className="m-2 bi bi-twitter"></i></a>
                                        <a style={{ textDecoration: 'none', color: 'white' }} href="/"><i className="m-2 bi bi-instagram"></i></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4 pt-3">
                            <ul style={{ listStyleType: 'none' }}>
                                <li>
                                    <h3>
                                        Speak with Us
                                    </h3>
                                </li>
                                <li><a style={{ textDecoration: 'none', color: 'white' }} href="">Home</a></li>
                                <li><a style={{ textDecoration: 'none', color: 'white' }} href="">About Us</a></li>
                                <li><a style={{ textDecoration: 'none', color: 'white' }} href="">Documentation</a></li>
                                <li><a style={{ textDecoration: 'none', color: 'white' }} href="">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-4 pt-3">
                            <ul style={{ listStyleType: 'none' }}>
                                <li>
                                    <h3>
                                        Learn More
                                    </h3>
                                </li>
                                <li><a style={{ textDecoration: 'none', color: 'white' }} href="">Webinars</a></li>
                                <li><a style={{ textDecoration: 'none', color: 'white' }} href="">Resources</a></li>
                                <li><a style={{ textDecoration: 'none', color: 'white' }} href="">FAQs</a></li>
                                <li><a style={{ textDecoration: 'none', color: 'white' }} href="">Events</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </footer >

        </>
    )
}