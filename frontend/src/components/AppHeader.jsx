import NavBar from "./NavBar"
import { NavLink } from 'react-router-dom';

export default function AppHeader() {

    return (
        <>
            <header style={{ height: '200px', backgroundColor: 'black', marginBottom: '100px', paddingTop: '20px', paddingLeft: '20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <img src="/logo.png" alt="logo" style={{ maxHeight: '40%', maxWidth: '40%' }} />
                <NavBar />
            </header>

        </>
    )
}