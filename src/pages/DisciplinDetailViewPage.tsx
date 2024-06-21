import { useLocation } from "react-router-dom";
import { Disciplin, ResultatGETDTO } from "../services/entityFacade";
import { useEffect, useState } from "react";
import { hentResultaterUdFraDisciplinId } from "../services/apiFacade";
import DisciplinResultaterTable from "../components/DisciplinResultaterTable";

export default function DisciplinDetailViewPage() {
    const disciplin = useLocation().state as Disciplin;
    const [resultater, setResultater] = useState<ResultatGETDTO[]>([]);
    const [kønFilter, setKønFilter] = useState<string>("");
    const [aldersgruppeFilter, setAldersgruppeFilter] = useState<string>("");

    useEffect(() => {
        hentResultaterUdFraDisciplinId(disciplin.id).then((data) => {
            // Sorter resultaterne efter resultat og navn
            const sorteretData = data.sort((resultat1: ResultatGETDTO, resultat2: ResultatGETDTO) => {
                if (resultat1.resultat === resultat2.resultat) {
                    return resultat1.deltager.navn.localeCompare(resultat2.deltager.navn);
                }
                return resultat1.resultat - resultat2.resultat;
            });
            setResultater(sorteretData);
            applyFiltersAndSorting(sorteretData);
        });
        // eslint-disable-next-line
    }, [disciplin.id, kønFilter, aldersgruppeFilter]);

    function applyFiltersAndSorting(data: ResultatGETDTO[]) {
        let filteredResultater = [...data];

        if (kønFilter) {
            filteredResultater = filteredResultater.filter((resultat) => resultat.deltager.køn === kønFilter);
        }

        if (aldersgruppeFilter) {
            filteredResultater = filteredResultater.filter((resultat) => resultat.deltager.aldersgruppe === aldersgruppeFilter);
        }

        setResultater(filteredResultater);
    }

    return (
        <div className="w-full h-screen px-48 pt-8">
            <h1 className="text-center text-4xl bold pb-4">{disciplin.navn}</h1>
            <div className="flex flex-wrap justify-between max-w-[50%] mx-auto mb-5">
                <div className="flex-1 min-w-[50%] p-1 text-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Køn</label>
                    <select onChange={(e) => setKønFilter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Intet Filter</option>
                        <option value="MAND">Mand</option>
                        <option value="KVINDE">Kvinde</option>
                        <option value="ANDET">Andet</option>
                    </select>
                </div>
                <div className="flex-1 min-w-[50%] p-1 text-center">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Aldersgruppe</label>
                    <select onChange={(e) => setAldersgruppeFilter(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Intet Filter</option>
                        <option value="Børn">Børn</option>
                        <option value="Unge">Unge</option>
                        <option value="Junior">Junior</option>
                        <option value="Voksne">Voksne</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>
            </div>
            <DisciplinResultaterTable disciplin={disciplin} resultater={resultater} />
        </div>
    );
}
