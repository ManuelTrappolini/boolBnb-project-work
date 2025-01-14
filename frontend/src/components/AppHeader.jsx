import NavBar from "./NavBar"
import { NavLink } from 'react-router-dom';

export default function AppHeader() {

    return (
        <>
            <header style={{ height: '150px', backgroundColor: 'black', marginBottom: '100px', paddingTop: '20px', paddingLeft: '20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <NavLink to='/'>  <img src="/logo.png" alt="logo" style={{ maxHeight: '40%', maxWidth: '40%' }} /></NavLink>
                <NavBar />
            </header>

        </>
    )
}