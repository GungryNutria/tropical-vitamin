import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home";

export default function App() {
    return (
    <Routes>
        <Route element={<MainLayout />} path="/" >
            <Route path="/" element={<Home />} />
        </Route>    
    </Routes>
    );
}