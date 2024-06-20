import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import DeltagerPage from "./pages/DeltagerPage";
import DeltagerDetailViewPage from "./pages/DeltagerDetailViewPage";
import AddDeltagerPage from "./pages/AddDeltagerPage";

export default function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<DeltagerPage />} />
                <Route path="/discipliner" element={<h1>Med dig</h1>} />
                <Route path="/test" element={<h1>Test</h1>} />
                <Route path="/addDeltager" element={<AddDeltagerPage />} />
                <Route path="/deltager/:id" element={<DeltagerDetailViewPage />} />
            </Routes>
        </div>
    );
}
