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

        // Creazione della query string
        const queryParams = new URLSearchParams({
            searchInput: formData.searchInput,
        }).toString();

        // Reindirizzamento all'URL con i parametri
        navigate(`/search?${queryParams}`);
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit} className="d-flex gap-4 justify-content-between flex-wrap" style={{ position: 'relative' }}>

                {/* Sezione per la ricerca per città */}
                <div className="">
                    <label htmlFor="city" className="form-label text-white">🔍 Search by city or address</label>
                    <input
                        type="text"
                        autoComplete="off"
                        name="searchInput"
                        className="form-control"
                        placeholder="Type Here..."
                        value={formData.searchInput}

                        onChange={handleInputChange}
                    />
                </div>

                {/* Bottone per inviare la ricerca */}
                <button
                    type="submit"
                    className="btn btn-primary mt-4 px-4 py-2 rounded shadow-sm btn-sm"
                    style={{ height: '45px' }}
                >
                    Search
                </button>
            </form>
        </div>
    );
}

export default SearchHome;
