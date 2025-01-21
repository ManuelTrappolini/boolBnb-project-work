import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function SearchHome() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        searchInput: "", // Solo l'input di ricerca per la città
    });


    // Gestire il cambiamento dell'input nel form
    const handleInputChange = (e) => {
        const { value } = e.target;

        // Aggiorna i dati del form
        setFormData((prev) => ({
            ...prev,
            searchInput: value
        }));
    };

    // Invia la ricerca
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Verifica che l'input non sia vuoto
        if (!formData.searchInput) {
            alert("Please enter a city or address.");
            return;
        }

        // Creazione della query string con parametri aggiuntivi
        const queryParams = new URLSearchParams({
            searchInput: formData.searchInput,
            minRooms: 0,
            minBeds: 0,
            selectedServices: ""
        }).toString();

        // Reindirizzamento all'URL con i parametri
        navigate(`/search?${queryParams}`);
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit} className="d-flex gap-2 justify-content-between flex-wrap" style={{ position: 'relative' }}>

                {/* Sezione per la ricerca per città */}
                <div>
                    <input
                        type="text"
                        autoComplete="off"
                        name="searchInput"
                        className="form-control"
                        placeholder="Search destination..."
                        value={formData.searchInput}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Bottone per inviare la ricerca */}
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchHome;
