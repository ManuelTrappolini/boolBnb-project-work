import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HeartCounter from '../components/HeartsCounter';
import { FaFan, FaShower, FaBed, FaAccessibleIcon, FaUtensils, FaParking, FaPaw, FaTree, FaSmoking, FaTv, FaWifi, FaQuestionCircle } from 'react-icons/fa';

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

    const servicesList = [
        { id: 3, name: 'Air-Conditioner', icon: <FaFan /> },
        { id: 5, name: 'Bathroom Essentials', icon: <FaShower /> },
        { id: 6, name: 'Bed linen', icon: <FaBed /> },
        { id: 11, name: 'Disabled Access', icon: <FaAccessibleIcon /> },
        { id: 4, name: 'Eat-in Kitchen', icon: <FaUtensils /> },
        { id: 1, name: 'Free Parking', icon: <FaParking /> },
        { id: 9, name: 'Pet allowed', icon: <FaPaw /> },
        { id: 2, name: 'Private Garden', icon: <FaTree /> },
        { id: 10, name: 'Smoker', icon: <FaSmoking /> },
        { id: 7, name: 'Television', icon: <FaTv /> },
        { id: 8, name: 'Wi-Fi', icon: <FaWifi /> },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/apartments/service');
                const data = await response.json();
                console.log(data);

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

                                </div>
                                <div className='ps-2'>

                                    {card.services?.length > 0 ? (
                                        <div className="d-flex flex-wrap justify-content-start gap-2 mt-3">
                                            {card.services.map((service, index) => {
                                                const matchedService = servicesList.find(item => item.id === service.id_service);

                                                if (matchedService) {
                                                    return (
                                                        <div key={index} className="service-icon d-flex align-items-center justify-content-center bg-light border rounded-circle" style={{ width: '40px', height: '40px' }}>
                                                            {matchedService.icon}
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div key={index} className="service-icon d-flex align-items-center justify-content-center bg-light border rounded-circle text-muted" style={{ width: '40px', height: '40px' }}>
                                                            <FaQuestionCircle />
                                                        </div>
                                                    );
                                                }
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-muted">No services available for this apartment.</p>
                                    )}
                                </div>
                                <div className="d-flex align-items-center justify-content-end">
                                    <p className="m-0">{card.vote}</p>
                                    <HeartCounter cardId={card.id} onHeartClick={() => setTriggerFetch(!triggerFetch)} />
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
