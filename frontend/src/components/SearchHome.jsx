import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function SearchHome() {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
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

    // Gestire la selezione della città dal dropdown
    const handleCitySelect = (city) => {
        setFormData((prev) => ({
            ...prev,
            searchInput: city
        }));
        setShowDropdown(false); // Nascondi il dropdown dopo la selezione
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
                    <label htmlFor="city" className="form-label">🔍 Search by city or address</label>
                    <input
                        type="text"
                        autoComplete="off"
                        name="searchInput"
                        className="form-control"
                        placeholder="Type Here..."
                        value={formData.searchInput}
                        onFocus={() => setShowDropdown(true)} // Mostra il dropdown quando l'input è focalizzato
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Nasconde il dropdown quando si perde il focus
                        onChange={handleInputChange}
                    />

                    {/* Dropdown delle città */}
                    {showDropdown && filteredCities.length > 0 && (
                        <ul className="reviews-scrollable dropdown-menu show position-absolute w-100 shadow" style={{ maxHeight: '150px', overflowY: 'auto', zIndex: 10 }}>
                            {filteredCities.map((city, index) => (
                                <li
                                    key={index}
                                    className="dropdown-item"
                                    style={{ cursor: 'pointer' }}
                                    onMouseDown={() => handleCitySelect(city)} // Aggiungi la funzione di selezione della città
                                >
                                    {city}
                                </li>
                            ))}
                        </ul>
                    )}
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
