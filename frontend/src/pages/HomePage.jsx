import { useState, useEffect } from 'react';

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
                    {cards.slice(0, 5).map((card) => (
                        <div key={card.id} className="col-md-2 mb-4">
                            <div className="card" style={{ width: '100%' }}>
                                <img
                                    src={card.picture_url || "https://www.classcountryhomes.it/wp-content/uploads/2021/07/appartamento-roma-centro-storico-con-terrazzo.jpg"}
                                    className="card-img-top"
                                    alt={card.title}
                                    style={{
                                        objectFit: 'cover',
                                        height: '200px',
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p>Indirizzo: {card.address}</p>
                                    <p>Voto: {card.vote}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                <div className="row">
                    {cards.slice(5, 10).map((card) => (
                        <div key={card.id} className="col-md-2 mb-4">
                            <div className="card" style={{ width: '100%' }}>
                                <img
                                    src={card.picture_url || "https://via.placeholder.com/150"}
                                    className="card-img-top"
                                    alt={card.title}
                                    style={{
                                        objectFit: 'cover',
                                        height: '200px',
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p>Indirizzo: {card.address}</p>
                                    <p>Voto: {card.vote}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
