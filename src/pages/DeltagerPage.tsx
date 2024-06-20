import { useState, useEffect } from "react";
import DeltagerTable from "../components/DeltagerTable";
import { getDeltagere } from "../services/apiFacade";
import { Deltager } from "../services/entityFacade";
import { Link } from "react-router-dom";

export default function DeltagerPage() {
    const [deltagere, setDeltagere] = useState<Deltager[]>([]);

    useEffect(() => {
        getDeltagere().then((data) => setDeltagere(data));
    }, []);

    return (
        <div className="w-full h-screen px-48 pt-8">
            <h1 className="text-center pb-4">Deltager liste</h1>
            <div className="flex justify-center pb-4">
                <Link to="/addDeltager" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Tilføj deltager
                </Link>
            </div>
            <DeltagerTable deltagere={deltagere} />
        </div>
    );
}
