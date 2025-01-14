import { useEffect, useState } from "react"
import { useParams } from "react-router"
import DetailLayout from "../components/DetailLayout"

function DetailPage() {
    const { id } = useParams()
    const [appartment, setAppartment] = useState()

    useEffect(() => {
        fetch("http://localhost:3002/apartments/2")
            .then((res) => res.json())
            .then((data) => setAppartment(data))
            .catch((error) => console.error("Errore nel recupero dei post:", error));
    }, [])

    return (
        <>
            <div>
                {appartment ? (

                    <DetailLayout appartment={appartment} />

                ) : (
                    <>
                        <span>Error 404: appartment not found</span>
                    </>
                )}
            </div>
        </>

    )
}

export default DetailPage