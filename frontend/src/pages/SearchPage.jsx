import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HeartCounter from '../components/HeartsCounter';

export default function HomePage() {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [minRooms, setMinRooms] = useState('');
    const [minBeds, setMinBeds] = useState('');

    const location = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            search: params.get('searchInput') || '',
            minRooms: params.get('minRooms') || '',
            minBeds: params.get('minBeds') || '',
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/apartments');
                const data = await response.json();

                if (data && data.apartments) {
                    setCards(data.apartments);
                } else {
                    console.error('Formato della risposta non valido:', data);
                }
            } catch (error) {
                console.error('Errore nel caricamento dei dati:', error);
            }
        };

        fetchData();
    }, [triggerFetch]);

    useEffect(() => {
        const { search, minRooms, minBeds } = getQueryParams();
        setSearch(search);
        setMinRooms(minRooms);
        setMinBeds(minBeds);
    }, [location.search]);

    const filteredCards = cards.filter((card) => {
        if (!card) return false;
        const matchesSearch = search ? card.address?.toLowerCase().includes(search.toLowerCase()) || card.city?.toLowerCase().includes(search.toLowerCase()) : true;
        const matchesMinRooms = minRooms ? card.rooms_number >= parseInt(minRooms) : true;
        const matchesMinBeds = minBeds ? card.beds >= parseInt(minBeds) : true;

        return matchesSearch && matchesMinRooms && matchesMinBeds;
    });

    return (
        <>
            <div className="container my-5">
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    minRooms={minRooms}
                    setMinRooms={setMinRooms}
                    minBeds={minBeds}
                    setMinBeds={setMinBeds}
                />

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
                                {card.services?.length > 0 ? (
                                    card.services.map((service, index) => (
                                        <li key={index} className="pb-2 col-6 col-sm-4">
                                            <span>{service.icon} {service.name}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-muted">No services available for this apartment.</p>
                                )}
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
