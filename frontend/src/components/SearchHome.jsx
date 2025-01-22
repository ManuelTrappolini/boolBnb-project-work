import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function SearchHome() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        searchInput: "", // Solo l'input di ricerca per la città
    });
    const [error, setError] = useState('')


    // Gestire il cambiamento dell'input nel form
    const handleInputChange = (e) => {
        const { value } = e.target;
        setError('')

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
            setError("Please enter a city or address.");
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
        <div className="bg-primary rounded col-10 col-md-5 px-4 py-3 border border-primary">
            <form onSubmit={handleSearchSubmit} className="d-flex flex-column justify-content-between" style={{ position: 'relative' }}>

                {/* Sezione per la ricerca per città */}
                <div>
                    <label htmlFor="city" className="form-label text-white">Search by city or address</label>

                </div>
                <div  className="d-flex flex-column flex-md-row gap-2">
                    <input
                        type="text"
                        autoComplete="off"
                        name="searchInput"
                        className="form-control"
                        placeholder="e.g. Rome"
                        value={formData.searchInput}
                        onChange={handleInputChange}
                    />

                    {/* Bottone per inviare la ricerca */}
                    <button
                        type="submit"
                        className="btn btn-light px-4 py-2 rounded shadow-sm btn-sm h-50"
                    >
                        Search
                    </button>
                </div>
                <span className="text-danger mt-2">{error}</span>
            </form>
        </div>
    );
}

export default SearchHome;
