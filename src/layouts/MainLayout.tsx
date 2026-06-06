import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function MainLayout() {
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [location.pathname]);

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}