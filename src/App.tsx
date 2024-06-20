import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<h1>Hej</h1>} />
                <Route path="/about" element={<h1>Med dig</h1>} />
            </Routes>
        </div>
    );
}
