import { useEffect, useState } from "react"
import { useParams } from "react-router"
import DetailApartment from "../components/DetailApartment"

export default function DetailApartmentPage() {
    const { id } = useParams()
    const [appartment, setAppartment] = useState()

    useEffect(() => {
        fetch(`http://localhost:3002/apartments/${id}`)
            .then((res) => res.json())
            .then((data) => setAppartment(data))
            .catch((error) => console.error("Errore nel recupero dei post:", error));
    }, [])

    return (
        <>
            <div>
                {appartment ? (

                    <DetailApartment appartment={appartment} />

                ) : (
                    <>
                        <span>Error 404: appartment not found</span>
                    </>
                )}
            </div>
        </>

    )
}

