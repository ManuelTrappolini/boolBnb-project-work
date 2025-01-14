function DetailLayout({ appartment }) {
    return (
        <>
            <div className="container my-5">
                {/* Immagine principale */}
                <div className="row">
                    <div className="col-12">
                        <img
                            src={appartment.picture_url}
                            alt={appartment.title}
                            className="img-fluid rounded shadow-lg"
                            style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                        />
                    </div>
                </div>

                {/* Titolo e breve descrizione */}
                <div className="row mt-4">
                    <div className="col-12 col-lg-8">
                        <h1 className="fw-bold">{appartment.title}</h1>
                        <p className="text-muted py-2">{appartment.address}</p>
                        <p className="pt-2">{appartment.description}</p>
                    </div>

                    {/* Dettagli principali */}
                    <div className="col-12 col-lg-4">
                        <div className="bg-light p-4 rounded shadow-sm">
                            <h5 className="fw-semibold mb-4">Details</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <i className="bi bi-house-door me-2"></i>
                                    {appartment.rooms_number} Rooms
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-person-fill me-2"></i>
                                    {appartment.beds} Beds
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-droplet me-2"></i>
                                    {appartment.bathrooms} Bathrooms
                                </li>
                                <li className="mb-2">
                                    <i className="bi bi-arrows-fullscreen me-2"></i>
                                    {appartment.square_meters} m²
                                </li>
                            </ul>
                            <button className="btn btn-primary w-100">
                                <i className="bi bi-calendar-check me-2"></i> Prenota
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sezione recensioni */}
                <div className="row mt-5">
                    <h3 className="fw-bold mb-4">Reviews</h3>
                    {appartment.reviews && appartment.reviews.length > 0 ? (
                        appartment.reviews.map((review) => (
                            <div key={review.id} className="col-12 mb-4">
                                <div className="p-3 border rounded shadow-sm">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="fw-semibold mb-1">{review.author_name}</h5>
                                        <small className="text-muted">
                                            {new Date(review.date).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <p className="mb-2 text-muted py-2">
                                        Stayed for {review.days_of_stay} days
                                    </p>
                                    <p className="mb-0 pt-2">{review.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No reviews available for this apartment.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default DetailLayout