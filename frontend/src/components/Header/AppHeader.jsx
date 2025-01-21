import NavBar from "./NavBar"
import { NavLink } from 'react-router-dom';

export default function AppHeader() {

    return (

        <header className="d-flex px-3 py-3 px-md-5 shadow justify-content-between align-items-center border-bottom" >
            <NavLink to='/' className='logo' >
                <img src="/logo.png" alt="logo" className="w-75"/>
            </NavLink>
            <NavBar />
        </header>
        
    )
}
