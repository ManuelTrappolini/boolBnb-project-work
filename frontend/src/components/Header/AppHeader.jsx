import NavBar from "./NavBar"
import { NavLink } from 'react-router-dom';

export default function AppHeader() {

    return (

        <header className="d-flex px-3 py-2 py-md-3 px-md-5 justify-content-between align-items-center" >
            <NavLink to='/' className='logo' >
                <img src="/logo.png" alt="logo"/>
            </NavLink>
            <NavBar />
        </header>
        
    )
}
