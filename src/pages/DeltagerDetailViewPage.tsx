import { Link, useLocation } from "react-router-dom";
import { Deltager, Resultat } from "../services/entityFacade";
import ReactCountryFlag from "react-country-flag";
import { calculateAge, formatResultat, formatDato } from "../services/helperUtils";

type ResultaterPerDisciplin = {
    [disciplinNavn: string]: Resultat[];
};

export default function DeltagerDetailViewPage() {
    const deltager = useLocation().state as Deltager;

    // Bruger en accumulator til at gruppere resultaterne per disciplin
    const resultaterPerDisciplin = deltager.resultater.reduce<ResultaterPerDisciplin>((acc, resultat) => {
        if (!acc[resultat.disciplinNavn]) {
            acc[resultat.disciplinNavn] = [];
        }
        acc[resultat.disciplinNavn].push(resultat);
        return acc;
    }, {});

    return (
        <div className="h-screen w-full px-48 pt-8 text-center">
            <Link to="/addDeltager" state={deltager} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Ændre oplysninger
            </Link>
            <h1 className="text-center text-4xl py-4">{deltager.navn}</h1>
            <p>
                Nationalitet: {deltager.landKode} <ReactCountryFlag countryCode={deltager.landKode} />
            </p>
            <p>Født: {deltager.fødselsdato}</p>
            <p>Alder: {calculateAge(deltager.fødselsdato)} år</p>
            <p>Aldersgruppe: {deltager.aldersgruppe}</p>
            <p>
                Email:
                <a className="text-blue-700" href={`mailto:${deltager.email}`}>
                    {deltager.email}
                </a>
            </p>
            <p>Køn: {deltager.køn}</p>
            <p>Klub: {deltager.klub}</p>
            <div>
                <h2 className="text-2xl font-bold underline mb-4">Discipliner og Resultater</h2>
                <div className={`grid grid-cols-${deltager.discipliner.length > 1 ? "2" : "1"} gap-4`}>
                    {deltager.discipliner.map((disciplin) => (
                        <div key={disciplin.id} className="mb-8 shadow-md">
                            <h3 className="text-xl font-bold mb-2">{disciplin.navn}</h3>
                            <table className="table-auto w-full text-m text-center text-gray-900">
                                <thead className="text-m text-gray-900 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">Dato</th>
                                        <th className="px-6 py-3">Resultat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultaterPerDisciplin[disciplin.navn].map((resultat) => (
                                        <tr key={resultat.id} className="odd:bg-white even:bg-gray-50 border-b">
                                            <td className="border px-6 py-4">{formatDato(resultat.dato)}</td>
                                            <td className="border px-6 py-4">{formatResultat(resultat.resultat, disciplin.resultatType)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
