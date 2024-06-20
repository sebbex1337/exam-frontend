import { useState, useEffect } from "react";
import DeltagerTable from "../components/DeltagerTable";
import { getDeltagere, getDiscipliner, søgDeltager } from "../services/apiFacade";
import { Deltager, Disciplin } from "../services/entityFacade";
import { Link } from "react-router-dom";

export default function DeltagerPage() {
    const [deltagere, setDeltagere] = useState<Deltager[]>([]);
    const [discipliner, setDiscipliner] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [kønFilter, setKønfilter] = useState("");
    const [disciplinFilter, setDisciplinFilter] = useState("");
    const [sorteringsKriterie, setSorteringsKriterie] = useState("");

    useEffect(() => {
        getDiscipliner().then((data) => setDiscipliner(data.map((disciplin: Disciplin) => disciplin.navn)));
        let filteredDeltagere = [...deltagere];

        if (search === "") {
            getDeltagere().then((data) => {
                filteredDeltagere = data;
                applyFiltersAndSorting();
            });
        } else {
            søgDeltager(search).then((data) => {
                filteredDeltagere = data;
                applyFiltersAndSorting();
            });
        }

        function applyFiltersAndSorting() {
            if (kønFilter) {
                filteredDeltagere = filteredDeltagere.filter((deltager) => deltager.køn === kønFilter);
            }

            if (disciplinFilter) {
                filteredDeltagere = filteredDeltagere.filter((deltager) => deltager.discipliner.some((disciplin) => disciplin.navn === disciplinFilter));
            }

            switch (sorteringsKriterie) {
                case "aldersgruppe":
                    filteredDeltagere.sort((a, b) => a.aldersgruppe.localeCompare(b.aldersgruppe));
                    break;
                case "klub":
                    filteredDeltagere.sort((a, b) => a.klub.localeCompare(b.klub));
                    break;
                default:
                    break;
            }

            setDeltagere(filteredDeltagere);
        }
        // Slår eslint fra fordi giver jeg den deltagere som dependency, så kører den uendeligt og det vil jeg ikke :)
        // eslint-disable-next-line
    }, [search, kønFilter, disciplinFilter, sorteringsKriterie]);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    return (
        <div className="w-full h-screen px-48 pt-8">
            <h1 className="text-center pb-4">Deltager liste</h1>
            <div className="flex justify-center pb-4">
                <Link to="/addDeltager" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Tilføj deltager
                </Link>
            </div>
            <div className="flex flex-wrap justfiy-between max-w-full mx-auto mb-5">
                <div className="flex-1 min-w-[20%] p-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Søg efter navn</label>
                    <input type="text" value={search} onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="flex-1 min-w-[20%] p-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Køn</label>
                    <select onChange={(e) => setKønfilter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Intet filter</option>
                        <option value="MAND">Mand</option>
                        <option value="KVINDE">Kvinde</option>
                        <option value="ANDET">Andet</option>
                    </select>
                </div>
                <div className="flex-1 min-w-[20%] p-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Disciplin</label>
                    <select onChange={(e) => setDisciplinFilter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Intet filter</option>
                        {discipliner.map((disciplin) => (
                            <option key={disciplin} value={disciplin}>
                                {disciplin}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[20%] p-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Alder eller klub</label>
                    <select onChange={(e) => setSorteringsKriterie(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Ingen sortering</option>
                        <option value="aldersgruppe">Aldersgruppe</option>
                        <option value="klub">Klub</option>
                    </select>
                </div>
            </div>
            <DeltagerTable deltagere={deltagere} />
        </div>
    );
}
