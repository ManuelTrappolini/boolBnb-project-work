import { useState } from "react";
import { useNavigate } from "react-router";

function SearchForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        trendingCity: "",
        searchInput: "",
        minRooms: 0,
        minBeds: 0
    });



    const handleInputChange = (e) => {
        e.preventDefault()
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
            searchInput: formData.searchInput,
            minRooms: formData.minRooms,
            minBeds: formData.minBeds
        }).toString();

        // Reindirizzamento all'URL con i parametri
        navigate(`/search?${queryParams}`)
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit} className="d-flex gap-4 justify-content-between">

                {/* Sezione per la ricerca per città o indirizzo */}
                <div className="search-bar">
                    <label htmlFor="city" className="form-label">🔍 Search by city or address</label>
                    <input
                        type="text"
                        name="searchInput"
                        className="form-control"
                        placeholder="Type Here..."
                        value={formData.searchInput}
                        onChange={handleInputChange}
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
                <input
                    type="submit"
                    value="Invia"
                    className="btn btn-primary ms-2"
                />
            </form>
        </div>
    );
}

export default SearchForm;
