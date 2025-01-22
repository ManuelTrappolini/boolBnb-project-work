import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import SearchHome from '../components/SearchHome';
import HeartCounter from '../components/HeartsCounter';
export default function HomePage() {
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('http://localhost:3002/apartments')
            .then(response => response.json())
            .then(data => {
                console.log('Risposta dell\'API:', data.apartments);
                setCards(data.apartments);
            })
            .catch(error => console.error('Errore nel caricamento dei dati:', error));
    }, []);

    return (
        <>
            <div className='jumbtron d-flex justify-content-center align-items-center'>
                <div className="jumb-overlay"></div>
                <div className='z-3 w-100 d-flex flex-column justify-content-center align-items-center'>
                    <h2 className='mb-4 text-white fs-1'>Look For Your Perfect Place </h2>
                    <SearchHome />
                </div>
            </div>
            <div className="container my-5">
                <div className='d-flex'>

                    <h1 className='mb-4'>Top rated </h1>
                </div>
                <hr className='border-primary' />





                {/* results */}
                <div className="row">
                    {cards.map((card) => (
                        <div key={card.id} className="col-md-3 col-12 p-3" style={{ height: '380px' }}>

                            <div className="card h-100 border-primary">
                                <Link to={`http://localhost:5173/apartments/${card.slug}`} style={{ height: '60%' }}>
                                    <img
                                        src={card.picture_url.startsWith('http') ? card.picture_url : `http://localhost:3002${card.picture_url}`}
                                        className="card-img-top h-100"
                                        alt={card.title}
                                    />
                                </Link>
                                <div className="card-body d-flex flex-column justify-content-between mt-2">
                                    <div>
                                        <Link to={`http://localhost:5173/apartments/${card.slug}`} className='text-black'>
                                            <h6 className="card-title">{card.title}</h6>
                                        </Link>
                                        <p className='mb-0'>{card.address}, {card.city}</p>
                                    </div>

                                    <div className='d-flex align-items-center justify-content-end'>
                                        <HeartCounter cardId={card.id} initialVotes={card.vote} />
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

