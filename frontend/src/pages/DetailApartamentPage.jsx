import { useEffect, useState } from "react"
import { useParams } from "react-router"
import DetailApartment from "../components/DetailApartment"

export default function DetailApartmentPage() {
    const { id } = useParams()
    const [apartment, setApartment] = useState()

    useEffect(() => {
        fetch(`http://localhost:3002/apartments/${id}`)
            .then((res) => res.json())
            .then((data) => setApartment(data))
            .catch((error) => console.error("Errore nel recupero dei post:", error));
    }, [])

    return (
        <>
            <div>
                {apartment ? (

                    <DetailApartment apartment={apartment} />

                ) : (
                    <>
                        <span>Error 404: apartment not found</span>
                    </>
                )}
            </div>
        </>

    )
}

