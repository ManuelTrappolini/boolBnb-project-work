import { Outlet } from "react-router-dom";
import AppHeader from "../components/Header/AppHeader";
import AppFooter from "../components/AppFooter";

export default function Layout() {

    return (
        <>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </>
    )
}