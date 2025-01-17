import { useState } from 'react';

const HeartCounter = ({ cardId, initialVotes }) => {
    const [votes, setVotes] = useState(initialVotes);
    const [isFilled, setIsFilled] = useState(false)

    // Gestire il click sul cuore
    const handleVote = async () => {
        console.log('click registrato');

        try {
            const newVoteCount = votes + 1;

            // Invia la richiesta al backend per aggiornare il voto
            const response = await fetch(`http://localhost:3002/apartments/${cardId}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ votes: newVoteCount }),
            });

            if (!response.ok) {
                throw new Error('Error updating the vote');
            }

            // Aggiorna il numero di voti
            setVotes(newVoteCount);

            setIsFilled(true);
            setTimeout(() => setIsFilled(false), 300)
            
        } catch (error) {
            console.error('Error sending the vote', error);
        }
    };


    return (
        <div onClick={handleVote} className="heart-counter">
            <span>{votes}</span>
            <i className={`bi ${isFilled ? 'bi-heart-fill' : 'bi-heart'}`}></i>
        </div>
    );
}

export default HeartCounter;
