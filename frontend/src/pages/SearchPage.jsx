import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Per accedere alla location
import SearchBar from '../components/SearchBar';
import HeartCounter from '../components/HeartsCounter';

export default function HomePage() {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [minRooms, setMinRooms] = useState('');
    const [minBeds, setMinBeds] = useState('');

    const location = useLocation(); // Usato per ottenere i parametri della query string

    // Funzione per ottenere i parametri della query string
    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            search: params.get('searchInput') || '',
            minRooms: params.get('minRooms') || '',
            minBeds: params.get('minBeds') || '',
        };
    };

    // Caricamento iniziale delle carte dall'API
    useEffect(() => {
        fetch('http://localhost:3002/apartments')
            .then(response => response.json())
            .then(data => {
                console.log('Risposta dell\'API:', data.apartments);
                setCards(data.apartments);
            })
            .catch(error => console.error('Errore nel caricamento dei dati:', error));
    }, [triggerFetch]);

    // Aggiorna lo stato in base ai parametri della query string
    useEffect(() => {
        const { search, minRooms, minBeds } = getQueryParams();
        setSearch(search);
        setMinRooms(minRooms);
        setMinBeds(minBeds);
        console.log(search, minBeds, minRooms);

    }, [location.search]); // Aggiorna ogni volta che cambia la query string

    // Filtrare i risultati in base ai parametri della query string
    const filteredCards = cards.filter((card) => {
        const matchesSearch = search ? card.address.toLowerCase().includes(search.toLowerCase()) || card.city.toLowerCase().includes(search.toLowerCase()) : true;
        const matchesMinRooms = minRooms ? card.rooms_number >= parseInt(minRooms) : true;
        const matchesMinBeds = minBeds ? card.beds >= parseInt(minBeds) : true;

        return matchesSearch && matchesMinRooms && matchesMinBeds;
    });


    return (
        <>
            <div className="container my-5">
                {/* SearchBar */}
                <div>
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        minRooms={minRooms}
                        setMinRooms={setMinRooms}
                        minBeds={minBeds}
                        setMinBeds={setMinBeds}
                    />
                </div>

                {/* Risultati */}
                <div className="row">
                    {filteredCards.length !== 0 ? filteredCards.map((card) => (
                        <div key={card.id} className="col-md-3 col-12 p-3">
                            <div className="card h-100">
                                <Link to={`/apartments/${card.id}`} className="h-75">
                                    <img
                                        src={card.picture_url || "https://www.classcountryhomes.it/wp-content/uploads/2021/07/appartamento-roma-centro-storico-con-terrazzo.jpg"}
                                        className="card-img-top h-100"
                                        alt={card.title}
                                    />
                                </Link>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <Link to={`/apartments/${card.id}`} className="text-black">
                                            <h6 className="card-title">{card.title}</h6>
                                        </Link>
                                        <p className="mb-0">{card.address}, {card.city}</p>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-end">
                                        <p className="m-0">{card.vote}</p>
                                        <HeartCounter cardId={card.id} onHeartClick={() => setTriggerFetch(!triggerFetch)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <h1 className='pt-5'>Nessun Appartamento Trovato con questi Requisiti</h1>
                    )}
                </div>
            </div>
        </>
    );
}
