import { useNavigate } from "react-router-dom";

export default function SearchBar({ setSearch, setMinRooms, setMinBeds, setSelectedServices, minBeds, minRooms, selectedServices }) {
    const navigate = useNavigate();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const searchValue = form.elements.searchInput.value.trim();

    };

    const handleTrendingChange = (event) => {
        const selectedCity = event.target.value;
        if (selectedCity) {
            setSearch(selectedCity);
            navigate(`/search/${encodeURIComponent(selectedCity)}`);
        }
    };

    // Gestore per i checkbox dei servizi
    const handleServiceChange = (event) => {
        const service = event.target.value;
        setSelectedServices((prev) =>
            prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
        );
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit} className="d-flex flex-column gap-4">
                {/* Sezione per la selezione della città */}
                <div>
                    <label htmlFor="trending-cities" className="form-label">Trending Cities:</label>
                    <select
                        id="trending-cities"
                        className="form-select"
                        onChange={handleTrendingChange}
                        defaultValue=""
                    >
                        <option value="" disabled>Select a city</option>
                        <option value="Napoli">Napoli</option>
                        <option value="Firenze">Firenze</option>
                        <option value="Milano">Milano</option>
                        <option value="Bari">Bari</option>
                        <option value="Palermo">Palermo</option>
                    </select>
                </div>

                {/* Sezione per la ricerca per città o indirizzo */}
                <div className="search-bar d-flex">
                    <input
                        type="text"
                        name="searchInput"
                        className="form-control"
                        placeholder="🔍 Search by city or address"
                    />
                    <input
                        type="submit"
                        value="Invia"
                        className="btn btn-primary ms-2"
                    />
                </div>

                {/* Filtro per il numero minimo di stanze */}
                <div>
                    <label htmlFor="minRooms" className="form-label">Min. Rooms:</label>
                    <input
                        type="number"
                        id="minRooms"
                        className="form-control"
                        value={minRooms}
                        onChange={(e) => setMinRooms(e.target.value)}
                        placeholder="Minimum number of rooms"
                    />
                </div>

                {/* Filtro per il numero minimo di posti letto */}
                <div>
                    <label htmlFor="minBeds" className="form-label">Min. Beds:</label>
                    <input
                        type="number"
                        id="minBeds"
                        className="form-control"
                        value={minBeds}
                        onChange={(e) => setMinBeds(e.target.value)}
                        placeholder="Minimum number of beds"
                    />
                </div>

                {/* Filtro per i servizi aggiuntivi */}
                <div>
                    <label className="form-label">Services:</label>
                    <div className="d-flex flex-column">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                value="WiFi"
                                className="form-check-input"
                                onChange={handleServiceChange}
                            />
                            <label className="form-check-label">WiFi</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                value="Parking"
                                className="form-check-input"
                                onChange={handleServiceChange}
                            />
                            <label className="form-check-label">Parking</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                value="AirConditioning"
                                className="form-check-input"
                                onChange={handleServiceChange}
                            />
                            <label className="form-check-label">Air Conditioning</label>
                        </div>
                        {/* Aggiungi altri servizi qui */}
                    </div>
                </div>
            </form>
        </div>
    );
}