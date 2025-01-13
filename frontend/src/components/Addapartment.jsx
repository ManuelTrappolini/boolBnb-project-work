import { useState } from "react"

export default function Addapartment() {
    const AppartmentForm = () => {
        const [title, setTitle] = useState('');
        const [rooms, setRooms] = useState('');
        const [beds, setBeds] = useState('');
        const [bathrooms, setBathrooms] = useState('');
        const [sqm, setSqm] = useState('');
        const [adress, setAddress] = useState('');
        const [email, setEmail] = useState('');
        const [image, setImage] = useState('');
        const [services, setServices] = useState({
            air_conditioner: false,
            bathroom_essentials: false,
            ved_linen: false,
            disabled_access: false,
            eat_in_kitchen: false,
            free_parking: false,
            pet_allowed: false,
            private_garden: false,
            smoker: false,
            television: false,
            wi_fi: false,
        });








    }
    return (
        <>
        </>
    )
}