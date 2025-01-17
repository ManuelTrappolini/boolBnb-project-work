import { useState } from "react";
import { useNavigate } from "react-router";

function SearchForm() {
    const [formData, setFormData] = useState({
        trendingCity: "",
        searchInput: "",
        minRooms: 0,
        minBeds: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Creazione della query string
        const queryParams = new URLSearchParams({
            trendingCity: formData.trendingCity,
            searchInput: formData.searchInput,
            minRooms: formData.minRooms,
            minBeds: formData.minBeds
        }).toString();

        // Reindirizzamento all'URL con i parametri
        window.location.href = `/search?${queryParams}`;
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
                        name="trendingCity"
                        value={formData.trendingCity}
                        onChange={handleInputChange}
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
                        value={formData.searchInput}
                        onChange={handleInputChange}
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
                        name="minRooms"
                        className="form-control"
                        placeholder="Minimum number of rooms"
                        value={formData.minRooms}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Filtro per il numero minimo di posti letto */}
                <div>
                    <label htmlFor="minBeds" className="form-label">Min. Beds:</label>
                    <input
                        type="number"
                        id="minBeds"
                        name="minBeds"
                        className="form-control"
                        placeholder="Minimum number of beds"
                        value={formData.minBeds}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
        </div>
    );
}

export default SearchForm;
