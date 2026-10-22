import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";
import Tours from "./pages/tours";
import Transportation from "./pages/transportation";
import Accommodation from "./pages/accommodation";
import Mice from "./pages/mice";
import Thematic from "./pages/thematic";
import ContactPage from "./pages/contact";
import Packages from "./pages/packages";
import PackageDetail from "./pages/packages/detalle";

export default function App() {
    return (
    <Routes>
        <Route element={<MainLayout />} path="/" >
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/transportacion" element={<Transportation />} />
            <Route path="/hospedaje" element={<Accommodation />} />
            <Route path="/mice" element={<Mice />} />
            <Route path="/tematicos" element={<Thematic />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="/paquetes" element={<Packages />} />
            <Route path="/paquetes/:slug" element={<PackageDetail />} />
        </Route>    
    </Routes>
    );
}