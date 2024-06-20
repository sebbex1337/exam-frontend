import { Link } from "react-router-dom";
import { Deltager } from "../services/entityFacade";
import ReactCountryFlag from "react-country-flag";
import { calculateAge, formatDiscipliner } from "../services/helperUtils";

interface props {
    deltagere: Deltager[];
}

export default function DeltagerTable({ deltagere }: props) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                        <th className="px-6 py-3">Land</th>
                        <th className="px-6 py-3">Navn</th>
                        <th className="px-6 py-3">Alder</th>
                        <th className="px-6 py-3">Aldersgruppe</th>
                        <th className="px-6 py-3">Køn</th>
                        <th className="px-6 py-3">Klub</th>
                        <th className="px-6 py-3">Discipliner</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {deltagere.map((deltager) => (
                        <tr key={deltager.id} className="odd:bg-white even:bg-gray-50 border-b">
                            <td className="px-6 py-4">
                                <ReactCountryFlag countryCode={deltager.landKode} />
                            </td>
                            <td className="px-6 py-4">{deltager.navn}</td>
                            <td className="px-6 py-4">{calculateAge(deltager.fødselsdato)}</td>
                            <td className="px-6 py-4">{deltager.aldersgruppe}</td>
                            <td className="px-6 py-4">{deltager.køn}</td>
                            <td className="px-6 py-4">{deltager.klub}</td>
                            <td className="px-6 py-4">{formatDiscipliner(deltager.discipliner)}</td>
                            <td className="px-6 py-4">
                                <Link to={`/deltager/${deltager.id}`} state={deltager} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Detaljer
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
