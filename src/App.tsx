import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import DeltagerPage from "./pages/DeltagerPage";
import DeltagerDetailViewPage from "./pages/DeltagerDetailViewPage";
import AddDeltagerPage from "./pages/AddDeltagerPage";
import AddResultatPage from "./pages/AddResultatPage";
import DisciplinPage from "./pages/DisciplinPage";
import AddDisciplinPage from "./pages/AddDisciplinPage";
import DisciplinDetailViewPage from "./pages/DisciplinDetailViewPage";

export default function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<DeltagerPage />} />
                <Route path="/discipliner" element={<DisciplinPage />} />
                <Route path="/addDeltager" element={<AddDeltagerPage />} />
                <Route path="/addResultat" element={<AddResultatPage />} />
                <Route path="/addDisciplin" element={<AddDisciplinPage />} />
                <Route path="/deltager/:id" element={<DeltagerDetailViewPage />} />
                <Route path="/disciplin/:id" element={<DisciplinDetailViewPage />} />
            </Routes>
        </div>
    );
}
