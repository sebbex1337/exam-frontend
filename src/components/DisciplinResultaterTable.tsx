import ReactCountryFlag from "react-country-flag";
import { Disciplin, ResultatGETDTO } from "../services/entityFacade";
import { calculateAge, formatDato, formatResultat } from "../services/helperUtils";

interface props {
    disciplin: Disciplin;
    resultater: ResultatGETDTO[];
}

export default function DisciplinResultaterTable({ disciplin, resultater }: props) {
    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-center rtl:text-right text-gray-700 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th className="px-6 py-3">Plads</th>
                            <th className="px-6 py-3">Land</th>
                            <th className="px-6 py-3">Navn</th>
                            <th className="px-6 py-3">Alder</th>
                            <th className="px-6 py-3">Aldersgruppe</th>
                            <th className="px-6 py-3">Køn</th>
                            <th className="px-6 py-3">Klub</th>
                            <th className="px-6 py-3">Restultat Type</th>
                            <th className="px-6 py-3">Restultat</th>
                            <th className="px-6 py-3">Dato</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultater.map((resultat, index) => (
                            <tr key={resultat.id} className="odd:bg-white even:bg-gray-50 border-b">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 text-4xl">
                                    <ReactCountryFlag countryCode={`${resultat.deltager.landKode}`} svg />
                                </td>
                                <td className="px-6 py-4">{resultat.deltager.navn}</td>
                                <td className="px-6 py-4">{calculateAge(resultat.deltager.fødselsdato)}</td>
                                <td className="px-6 py-4">{resultat.deltager.aldersgruppe}</td>
                                <td className="px-6 py-4">{resultat.deltager.køn}</td>
                                <td className="px-6 py-4">{resultat.deltager.klub}</td>
                                <td className="px-6 py-4">{disciplin.resultatType}</td>
                                <td className="px-6 py-4">{formatResultat(resultat.resultat, disciplin.resultatType)}</td>
                                <td className="px-6 py-4">{formatDato(resultat.dato)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
