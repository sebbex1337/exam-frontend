import { Link, useLocation } from "react-router-dom";
import { Deltager, Resultat, ResultatDTO } from "../services/entityFacade";
import ReactCountryFlag from "react-country-flag";
import { calculateAge, formatResultat, formatDato } from "../services/helperUtils";
import React, { useState } from "react";
import { opdaterResultat, sletResultat } from "../services/apiFacade";

type ResultaterPerDisciplin = {
    [disciplinNavn: string]: Resultat[];
};

const EMPTY_RESULT: ResultatDTO = {
    id: 0,
    deltagerId: 0,
    resultat: 0,
    dato: "",
    disciplinId: 0,
};

export default function DeltagerDetailViewPage() {
    const [deltager, setDeltager] = useState<Deltager>(useLocation().state as Deltager);
    const [editingResultatId, setEditingResultatId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<ResultatDTO>(EMPTY_RESULT);

    // Bruger en accumulator til at gruppere resultaterne per disciplin
    const resultaterPerDisciplin = deltager.resultater.reduce<ResultaterPerDisciplin>((acc, resultat) => {
        if (!acc[resultat.disciplinNavn]) {
            acc[resultat.disciplinNavn] = [];
        }
        acc[resultat.disciplinNavn].push(resultat);
        return acc;
    }, {});

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, field: "dato" | "resultat") {
        setEditValues({
            ...editValues,
            [field]: e.target.value,
        });
    }

    async function handleSaveResultat(resultatId: number, disciplinNavn: string) {
        await opdaterResultat(editValues);
        setEditingResultatId(null);

        // Resultat objekt skal opdateres i deltager objektet
        const newResultat: Resultat = {
            id: resultatId,
            dato: editValues.dato,
            disciplinNavn: disciplinNavn,
            resultat: editValues.resultat,
        };

        const filteredResultater = deltager.resultater.filter((resultat) => resultat.id !== resultatId);
        const updatedResultater = filteredResultater.concat(newResultat);

        // Opdater deltager lokalt med det nye resultat
        const updatedDeltager = { ...deltager, resultater: updatedResultater };
        setDeltager(updatedDeltager);
    }

    async function handleDeleteResultat(resultatId: number) {
        if (resultatId) {
            if (confirm("Er du sikker på at du vil slette denne disciplin?")) {
                const res = await sletResultat(resultatId);
                if (res.ok) {
                    setEditingResultatId(null);
                    const updatedResultater = deltager.resultater.filter((resultat) => resultat.id !== resultatId);
                    const updatedDeltager = { ...deltager, resultater: updatedResultater };
                    setDeltager(updatedDeltager);
                }
            }
        }
    }

    return (
        <div className="h-screen w-full px-48 pt-8 text-center">
            <Link to="/addDeltager" state={deltager} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Ændre oplysninger
            </Link>
            <h1 className="text-center text-4xl py-4">{deltager.navn}</h1>
            <p>
                Nationalitet: {deltager.landKode}{" "}
                <span className="text-xl">
                    <ReactCountryFlag svg countryCode={deltager.landKode} />
                </span>
            </p>
            <p>Født: {deltager.fødselsdato}</p>
            <p>Alder: {calculateAge(deltager.fødselsdato)} år</p>
            <p>Aldersgruppe: {deltager.aldersgruppe}</p>
            <p>
                Email:{" "}
                <a className="text-blue-700" href={`mailto:${deltager.email}`}>
                    {deltager.email}
                </a>
            </p>
            <p>Køn: {deltager.køn}</p>
            <p>Klub: {deltager.klub}</p>
            <div>
                <h2 className="text-2xl font-bold underline mb-4">Discipliner og Resultater</h2>
                <Link to="/addResultat" state={deltager} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Tilføj resultat
                </Link>
                <div className={`grid grid-cols-${deltager.discipliner.length > 1 ? "2" : "1"} gap-4`}>
                    {deltager.discipliner.map((disciplin) => (
                        <div key={disciplin.id} className="mb-8 ">
                            <h3 className="text-xl font-bold mb-2">{disciplin.navn}</h3>
                            {resultaterPerDisciplin[disciplin.navn] && resultaterPerDisciplin[disciplin.navn].length > 0 ? (
                                <table className="table-auto w-full text-m text-center text-gray-900 shadow-md">
                                    <thead className="text-m text-gray-900 uppercase bg-gray-200">
                                        <tr>
                                            <th className="px-6 py-3">Dato</th>
                                            <th className="px-6 py-3">Resultat</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultaterPerDisciplin[disciplin.navn].map((resultat) => (
                                            <tr key={resultat.id} className="odd:bg-white even:bg-gray-50 border-b">
                                                {editingResultatId === resultat.id ? (
                                                    <>
                                                        <td className="border px-6 py-4">
                                                            <input type="date" value={editValues.dato} onChange={(e) => handleInputChange(e, "dato")} />
                                                        </td>
                                                        <td className="border px-6 py-4">
                                                            <input type="text" value={editValues.resultat} onChange={(e) => handleInputChange(e, "resultat")} />
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <button onClick={() => handleSaveResultat(resultat.id, resultat.disciplinNavn)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                                                                Gem
                                                            </button>
                                                            <button onClick={() => handleDeleteResultat(resultat.id)} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg ml-2">
                                                                Slet
                                                            </button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="border px-6 py-4">{formatDato(resultat.dato)}</td>
                                                        <td className="border px-6 py-4">{formatResultat(resultat.resultat, disciplin.resultatType)}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingResultatId(resultat.id);
                                                                    setEditValues({
                                                                        id: resultat.id,
                                                                        dato: resultat.dato,
                                                                        resultat: resultat.resultat,
                                                                        disciplinId: disciplin.id,
                                                                        deltagerId: deltager.id,
                                                                    });
                                                                }}
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                            >
                                                                Redigér
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Ingen resultater</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
