import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function HomePage() {
    const [cards, setCards] = useState([]);

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
            <div className="container my-5">
                <div className="row">
                    {cards.map((card) => (
                        <div key={card.id} className="col-md-3 col-12 mb-4">
                            <Link to={`http://localhost:5173/apartments/${card.id}`} className=''>
                                <div className="card" style={{ width: '100%', height: '400px' }}>
                                    <img
                                        src={card.picture_url || "https://www.classcountryhomes.it/wp-content/uploads/2021/07/appartamento-roma-centro-storico-con-terrazzo.jpg"}
                                        className="card-img-top"
                                        alt={card.title}
                                        style={{
                                            objectFit: 'cover',
                                            height: '200px',
                                        }}
                                    />
                                    <div className="card-body" style={{ height: '200px' }}>
                                        <h5 className="card-title">{card.title}</h5>
                                        <p>Indirizzo: {card.address}</p>
                                        <p>Voto: {card.vote}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

