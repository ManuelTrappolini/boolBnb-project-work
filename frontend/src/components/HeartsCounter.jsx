import { useState, useEffect } from "react"
import { useParams } from "react-router"



const HeartCounter = ({ cardId }) => {
    const [votes, setVotes] = useState(0)
    console.log(cardId)
    // Load initial vote from database

    useEffect(() => {

        if (!cardId) {
            console.error("ID dell'appartamento mancante");
            return;
        }

        const fetchVotes = async () => {
            try {
                const response = await fetch(`http://localhost:3002/apartments/${cardId}`)
                const data = await response.json();
                setVotes(data.votes)
            }
            catch (error) {
                console.error('Cannot add vote', error)
            }
        }

        fetchVotes();
    }, [cardId])

    //Handle click on heart to add vote

    const handleVote = async () => {
        try {
            const newVoteCount = votes + 1;

            // Sending the request to the backend to update the vote

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

            //Update votes number

            setVotes(newVoteCount);
        } catch (error) {
            console.error('Error sending the vote', error);
        }
    };

    return (
        <div>
            <button onClick={handleVote} style={{ background: 'transparent', border: 'none' }}>
                <span style={{ fontSize: '30px', color: 'gray' }}>&#10084;</span> {/* Cuore */}
            </button>

        </div>
    )
}

export default HeartCounter