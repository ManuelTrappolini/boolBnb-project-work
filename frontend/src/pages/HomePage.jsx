import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import SearchBar from '../components/SearchBar';
import HeartCounter from '../components/HeartsCounter';
export default function HomePage() {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('')
    const [triggerFetch, setTriggerFetch] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3002/apartments')
            .then(response => response.json())
            .then(data => {
                console.log('Risposta dell\'API:', data.apartments);
                setCards(data.apartments);
            })
            .catch(error => console.error('Errore nel caricamento dei dati:', error));
    }, [triggerFetch]);

    /* filter */
    const filteredCards = cards.filter(card =>
        card.address.toLowerCase().includes(search.toLocaleLowerCase()) || card.city.toLowerCase().includes(search.toLocaleLowerCase())
    )

    return (
        <>
            <div className="container my-5">

                {/* search */}
                <div className='search-bar'>
                    <SearchBar search={search} setSearch={setSearch} />
                </div>

                {/* results */}
                <div className="row">
                    {filteredCards.map((card) => (
                        <div key={card.id} className="col-md-3 col-12 p-3">

                            <div className="card h-100">
                                <Link to={`http://localhost:5173/apartments/${card.id}`} className='h-75'>
                                    <img
                                        src={card.picture_url || "https://www.classcountryhomes.it/wp-content/uploads/2021/07/appartamento-roma-centro-storico-con-terrazzo.jpg"}
                                        className="card-img-top h-100"
                                        alt={card.title}
                                    />
                                </Link>
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <Link to={`http://localhost:5173/apartments/${card.id}`} className='text-black'>
                                            <h6 className="card-title">{card.title}</h6>
                                        </Link>
                                        <p className='mb-0'>{card.address}, {card.city}</p>
                                    </div>

                                    <div className='d-flex align-items-center justify-content-end'>
                                        <p className='m-0'>{card.vote}</p>
                                        <HeartCounter cardId={card.id} onHeartClick={() => setTriggerFetch(!triggerFetch)} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

