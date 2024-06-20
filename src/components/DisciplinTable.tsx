import { Link } from "react-router-dom";
import { Disciplin } from "../services/entityFacade";

interface props {
    discipliner: Disciplin[];
}

export default function DisciplinTable({ discipliner }: props) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th className="px-6 py-3 w-[40%]">Navn</th>
                        <th className="px-6 py-3 w-[40%]">Restultat Type</th>
                        <th className="px-6 py-3 w-[20%] text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {discipliner.map((disciplin) => (
                        <tr key={disciplin.id} className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4">{disciplin.navn}</td>
                            <td className="px-6 py-4">{disciplin.resultatType}</td>
                            <td className="px-6 py-4 text-center">
                                <Link to={`/disciplin/${disciplin.id}`} state={disciplin} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Detaljer
                                </Link>
                                <Link to="/addDisciplin" state={disciplin} className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-4">
                                    Redigér
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
