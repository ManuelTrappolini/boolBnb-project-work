import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HeartCounter from '../components/HeartsCounter';
import { FaFan, FaShower, FaBed, FaAccessibleIcon, FaUtensils, FaParking, FaPaw, FaTree, FaSmoking, FaTv, FaWifi } from 'react-icons/fa';

export default function SearchPage() {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('');
    const [minRooms, setMinRooms] = useState('');
    const [minBeds, setMinBeds] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const location = useLocation();

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

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            search: params.get('searchInput') || '',
            minRooms: params.get('minRooms') || '',
            minBeds: params.get('minBeds') || '',
            selectedServices: params.get('selectedServices') ? params.get('selectedServices').split(',') : [],
        };
    };

    useEffect(() => {
        const { search, minRooms, minBeds, selectedServices } = getQueryParams();
        setSearch(search);
        setMinRooms(minRooms);
        setMinBeds(minBeds);
        setSelectedServices(selectedServices.map(service => normalizeString(service)));
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/apartments/service');
                const data = await response.json();
                setCards(data.apartments || []);
            } catch (error) {
                console.error('Errore nel caricamento dei dati:', error);
            }
        };
        fetchData();
    }, []);

    const normalizeString = (str) => {
        return str.replace(/[-\s]/g, '').toLowerCase();
    };

    const filteredCards = cards.filter((card) => {
        if (!card) return false;

        const matchesSearch = search ? card.address?.toLowerCase().includes(search.toLowerCase()) || card.city?.toLowerCase().includes(search.toLowerCase()) : true;
        const matchesMinRooms = minRooms ? card.rooms_number >= parseInt(minRooms) : true;
        const matchesMinBeds = minBeds ? card.beds >= parseInt(minBeds) : true;

        const matchesSelectedServices = selectedServices.length > 0
            ? selectedServices.every(serviceName =>
                card.services.some(cardService => {
                    const matchedService = servicesList.find(service => normalizeString(service.name) === serviceName);
                    return matchedService && cardService.id_service === matchedService.id;
                })
            )
            : true;

        return matchesSearch && matchesMinRooms && matchesMinBeds && matchesSelectedServices;
    });

    return (
        <div className="container my-5">
            <h1 className='my-4'>Find the Perfect Home</h1>
            <hr />
            <div className='mb-3'>
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    minRooms={minRooms}
                    setMinRooms={setMinRooms}
                    minBeds={minBeds}
                    setMinBeds={setMinBeds}
                />
            </div>

            <div className="mt-4">
                <h4>{filteredCards.length} Results Found</h4>
            </div>

            <div className="row">
                {filteredCards.length !== 0 ? filteredCards.map((card) => (
                    <div key={card.id} className="col-md-4 col-12 p-3 " style={{ height: '650px' }}>
                        <div className="card h-100 border border-primary">
                            <div className='h-50'>
                                <Link to={`/apartments/${card.slug}`}>
                                    <img
                                        src={card.picture_url.startsWith('http') ? card.picture_url : `http://localhost:3002${card.picture_url}`}
                                        className="card-img-top h-100"
                                        alt={card.title}
                                    />
                                </Link>
                            </div>

                            <div className='d-flex flex-column justify-content-between h-50'>
                                <div>
                                    <div className="p-3">
                                        <Link to={`/apartments/${card.slug}`} className="text-black">
                                            <h6 className="card-title">{card.title}</h6>
                                        </Link>
                                        <p className="mb-0">{card.address}, {card.city}</p>
                                    </div>

                                    <div className="px-3 rounded">
                                        <ul className="list-unstyled">
                                            <div className='d-flex justify-content-between'>
                                                <li className="mb-2">
                                                    <i className="bi bi-house-door me-2"></i>
                                                    {card.rooms_number} Rooms
                                                </li>
                                                <li className="mb-2">
                                                    <i className="bi bi-person-fill me-2"></i>
                                                    {card.beds} Beds
                                                </li>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <li className="mb-2">
                                                    <i className="bi bi-droplet me-2"></i>
                                                    {card.bathrooms} Bathrooms
                                                </li>
                                                <li className="mb-2">
                                                    <i className="bi bi-arrows-fullscreen me-2"></i>
                                                    {card.square_meters} m²
                                                </li>
                                            </div>
                                        </ul>
                                    </div>

                                    <div className='ps-2'>
                                        {card.services?.length > 0 ? (
                                            <div className="d-flex flex-wrap justify-content-start gap-2">
                                                {card.services.map((service, index) => {
                                                    const matchedService = servicesList.find(item => item.id === service.id_service);
                                                    const isSelected = selectedServices.includes(normalizeString(matchedService?.name));

                                                    return (
                                                        <div key={index} className="service-icon d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                                            <div style={{ color: isSelected ? 'green' : 'inherit' }}>
                                                                {matchedService?.icon}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <p className="text-muted">No services available for this apartment.</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className='d-flex justify-content-between ps-3 pt-2 pb-3'>
                                        <div className='pt-1'>
                                            Recensioni: {card.reviews.length}
                                        </div>
                                        <div className="d-flex align-items-center justify-content-end pe-3">
                                            <HeartCounter cardId={card.id} initialVotes={card.vote} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-12 text-center">
                        <h4>No results found</h4>
                    </div>
                )}
            </div>
        </div>
    );
}
