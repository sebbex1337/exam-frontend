import { useEffect, useState } from "react";
import { getDiscipliner } from "../services/apiFacade";
import { Disciplin } from "../services/entityFacade";
import DisciplinTable from "../components/DisciplinTable";
import { Link } from "react-router-dom";

export default function DisciplinPage() {
    const [discipliner, setDiscipliner] = useState<Disciplin[]>([]);

    useEffect(() => {
        getDiscipliner().then((data) => setDiscipliner(data));
    }, []);

    return (
        <div className="w-full h-screen px-48 pt-8">
            <h1 className="text-center text-2xl bold pb-4">Discipliner</h1>
            <div className="flex justify-center pb-8">
                <Link to="/addDisciplin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Tilføj ny disciplin
                </Link>
            </div>
            <DisciplinTable discipliner={discipliner} />
        </div>
    );
}
