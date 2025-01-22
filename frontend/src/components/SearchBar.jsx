import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SearchForm() {
    const [services, setServices] = useState([]);
    const [serviceNames, setServiceNames] = useState([]); // Stato per i nomi dei servizi formattati
    const [showServices, setShowServices] = useState(false); // Stato per la visibilità dei servizi
    const [isMounted, setIsMounted] = useState(false); // Flag per sapere se il componente è montato

    const navigate = useNavigate();
    const location = useLocation(); // Hook per ottenere la location corrente (inclusa la query string)
    const [formData, setFormData] = useState({
        trendingCity: "",
        searchInput: "", // Aggiungi il campo searchInput
        minRooms: 0,
        minBeds: 0,
        selectedServices: [] // Stato per i servizi selezionati (array di servizi)
    });

    // Effettuare il fetch per i servizi
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3002/apartments/indexService');
                const data = await response.json();
                if (data && data.services) {
                    setServices(data.services);
                } else {
                    console.error('Formato della risposta non valido per i servizi:', data);
                }
            } catch (error) {
                console.error('Errore nel caricamento dei servizi:', error);
            }
        };

        fetchServices();
    }, []);

    // Formattare i nomi dei servizi
    useEffect(() => {
        if (services.length > 0) {
            const formattedNames = services.map(service => {
                const name = service; // Fallback nel caso in cui name_service sia undefined
                return name
                    .replace(/_/g, " ")  // Rimuove gli underscore
                    .split(" ")  // Divide in parole
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalizza ogni parola
                    .join(" ");  // Unisce le parole in una stringa
            });
            setServiceNames(formattedNames);
        }
    }, [services]);

    // Prelevare il parametro searchInput dalla query string e impostarlo nello stato
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchInputFromQuery = params.get('searchInput') || ''; // Ottieni il valore del parametro searchInput, se presente
        setFormData(prev => ({
            ...prev,
            searchInput: searchInputFromQuery
        }));
    }, [location.search]); // Ogni volta che cambia la query string

    // Gestire il cambiamento dell'input nel form
    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        // Impedire che il numero diventi negativo
        let newValue = value;

        if ((name === "minRooms" || name === "minBeds") && parseInt(value) < 0) {
            newValue = 0;  // Imposta a 0 se il valore è negativo
        }

        // Aggiorna i dati del form
        setFormData((prev) => ({
            ...prev,
            [name]: newValue
        }));

    };

    useEffect(() => {
        if (isMounted) {  // Solo dopo il primo render
            handleSearchSubmit(new Event('submit'));  // Questo invia il form quando i servizi cambiano
        } else {
            setIsMounted(true);  // Impostiamo il flag dopo il primo render
        }
    }, [formData.selectedServices]);

    // Gestire il cambiamento dei checkbox dei servizi
    const handleServiceChange = (e) => {
        const { value, checked } = e.target;

        // Aggiornare lo stato con i servizi selezionati
        setFormData((prev) => {
            let selectedServices = [...prev.selectedServices];
            if (checked) {
                selectedServices.push(value);
            } else {
                selectedServices = selectedServices.filter(service => service !== value);
            }
            return {
                ...prev,
                selectedServices
            };
        });
    };

    // Funzione per reimpostare i filtri
    const resetFilters = () => {
        setFormData({
            trendingCity: "",
            searchInput: "",
            minRooms: 0,
            minBeds: 0,
            selectedServices: []
        });

        // Reindirizzamento all'URL base senza query string
        navigate("/search");
    };

    // Invia la ricerca
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Creazione della query string
        const queryParams = new URLSearchParams({
            searchInput: formData.searchInput,
            minRooms: formData.minRooms,
            minBeds: formData.minBeds,
            selectedServices: formData.selectedServices.join(",") // Aggiungi i servizi selezionati alla query
        }).toString();

        // Reindirizzamento all'URL con i parametri
        navigate(`/search?${queryParams}`);
    };

    // Funzione per toggle della visibilità dei servizi
    const toggleServicesVisibility = () => {
        setShowServices(prevState => !prevState);
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit} className="d-flex gap-4 justify-content-between flex-wrap" style={{ position: 'relative' }}>

                {/* Sezione per la ricerca per città o indirizzo */}
                <div className="search-bar position-relative">
                    <label htmlFor="city" className="form-label">🔍 Search by city or address</label>
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

                {/* Filtro per il numero minimo di stanze */}
                <div className="col-5 col-md-1">
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
                <div className="col-5 col-md-1">
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

                {/* Bottone per mostrare/nascondere i servizi */}
                <div>
                    <button
                        type="button"
                        className="btn btn-secondary mt-4 px-4 py-2 rounded shadow-sm btn-sm"
                        style={{ height: '45px' }}
                        onClick={toggleServicesVisibility}
                    >
                        Filter by Service
                    </button>

                    {/* Finestra popup dei servizi */}
                    {showServices && (
                        <div
                            className="col-6 col-md-2"
                            style={{
                                position: 'absolute',
                                top: '100%',
                                backgroundColor: '#f8f9fa',
                                padding: '15px',
                                borderRadius: '5px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                zIndex: 1,
                            }}
                        >
                            <label htmlFor="selectedServices" className="form-label">Select Services:</label>
                            <div>
                                {serviceNames.length > 0 ? serviceNames.map((service, index) => (
                                    <div key={index} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`service-${index}`}
                                            value={service}
                                            checked={formData.selectedServices.includes(service)}
                                            onChange={handleServiceChange}
                                        />
                                        <label className="form-check-label" htmlFor={`service-${index}`}>
                                            {service}
                                        </label>
                                    </div>
                                )) : <div>No services found</div>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottone per rimuovere i filtri */}
                <button
                    type="button"
                    className="btn btn-danger mt-4 px-4 py-2 rounded shadow-sm btn-sm"
                    style={{ height: '45px' }}
                    onClick={resetFilters}
                >
                    Remove Filter
                </button>

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

export default SearchForm;
