export default function HomePage() {

    const cards = [
        { title: 'Card 1', text: 'Descrizione della card 1' },
        { title: 'Card 2', text: 'Descrizione della card 2' },
        { title: 'Card 3', text: 'Descrizione della card 3' },
        { title: 'Card 4', text: 'Descrizione della card 4' },
        { title: 'Card 5', text: 'Descrizione della card 5' },
        { title: 'Card 6', text: 'Descrizione della card 6' },
        { title: 'Card 7', text: 'Descrizione della card 7' },
        { title: 'Card 8', text: 'Descrizione della card 8' },
        { title: 'Card 9', text: 'Descrizione della card 9' },
        { title: 'Card 10', text: 'Descrizione della card 10' },
    ];

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    {cards.slice(0, 5).map((card, index) => (
                        <div key={index} className="col-md-2 mb-4">
                            <div className="card" style={{ width: '100%' }}>
                                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Card image" />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    {cards.slice(5, 10).map((card, index) => (
                        <div key={index} className="col-md-2 mb-4">
                            <div className="card" style={{ width: '100%' }}>
                                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Card image" />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );



}