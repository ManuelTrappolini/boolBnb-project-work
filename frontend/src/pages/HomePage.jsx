import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import SearchBar from '../components/SearchBar';
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
    const filteredCards = cards.filter(card =>
        card.address.toLowerCase().includes(search.toLocaleLowerCase()) || card.city.toLowerCase().includes(search.toLocaleLowerCase())
    )
    return (
        <>
            <div className="container my-5">
                <SearchBar search={search} setSearch={setSearch} />
                <div className="row">
                    {filteredCards.map((card) => (
                        <div key={card.id} className="col-md-3 col-12 p-3">
                            <Link to={`http://localhost:5173/apartments/${card.id}`} className=''>
                                <div className="card h-100">
                                    <img
                                        src={card.picture_url || "https://www.classcountryhomes.it/wp-content/uploads/2021/07/appartamento-roma-centro-storico-con-terrazzo.jpg"}
                                        className="card-img-top h-50"
                                        alt={card.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p>{card.address}</p>
                                        <p>{card.city}</p>
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

