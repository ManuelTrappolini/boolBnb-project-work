import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function SearchHome() {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        searchInput: "", // Solo l'input di ricerca per la città
    });

    // Effettuare il fetch per le città
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:3002/apartments/city');
                const data = await response.json();
                if (data && data.cities) {
                    const filterCities = data.cities.filter((item, index) => data.cities.indexOf(item) === index);
                    setCities(filterCities);
                    setFilteredCities(filterCities); // Mostra tutte le città inizialmente
                } else {
                    console.error('Formato della risposta non valido:', data);
                }
            } catch (error) {
                console.error('Errore nel caricamento delle città:', error);
            }
        };

        fetchCities();
    }, []);

    // Gestire il cambiamento dell'input nel form
    const handleInputChange = (e) => {
        const { value } = e.target;

        // Aggiorna i dati del form
        setFormData((prev) => ({
            ...prev,
            searchInput: value
        }));

        // Filtra le città per il dropdown
        const filtered = cities.filter((city) =>
            city.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredCities(filtered);
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
                        onFocus={() => setShowDropdown(true)} 
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} 
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
