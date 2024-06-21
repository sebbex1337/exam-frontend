// src/components/MassResultatForm.tsx
import React, { useState, useEffect } from "react";
import { Deltager, Disciplin, ResultatDTO } from "../services/entityFacade";
import { opretResultat, getDiscipliner, getDeltagere } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";

export default function MangeResultaterForm() {
    const navigate = useNavigate();
    const [deltagere, setDeltagere] = useState<Deltager[]>([]);
    const [disciplinId, setDisciplinId] = useState<number>(0);
    const [resultater, setResultater] = useState<{ [key: string]: number }>({});
    const [discipliner, setDiscipliner] = useState<Disciplin[]>([]);

    useEffect(() => {
        getDiscipliner().then((data) => setDiscipliner(data));
    }, []);

    useEffect(() => {
        if (disciplinId > 0) {
            getDeltagere().then((data) => {
                // Filtrer deltagerne så kun dem der deltager i disciplinen vises
                const filtreredeDeltagere = data.filter((deltager: Deltager) => deltager.discipliner.some((disciplin) => disciplin.id === disciplinId));
                setDeltagere(filtreredeDeltagere);
            });
        }
    }, [disciplinId]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        for (const deltagerId in resultater) {
            const resultat: ResultatDTO = {
                id: 0,
                deltagerId: Number(deltagerId),
                disciplinId,
                resultat: resultater[deltagerId],
                dato: new Date().toISOString().split("T")[0], // Dagens dato
            };
            await opretResultat(resultat);
        }
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto pt-8">
            <select value={disciplinId} onChange={(e) => setDisciplinId(Number(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option disabled value={0}>
                    Vælg disciplin
                </option>
                {discipliner.map((disciplin) => (
                    <option key={disciplin.id} value={disciplin.id}>
                        {disciplin.navn}
                    </option>
                ))}
            </select>
            {deltagere.map((deltager) => (
                <div key={deltager.id} className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">{deltager.navn}</label>
                    <input
                        type="number"
                        value={resultater[deltager.id] || ""}
                        onChange={(e) => setResultater({ ...resultater, [deltager.id]: Number(e.target.value) })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
            ))}
            <button type="submit" className="mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">
                Gem resultater
            </button>
        </form>
    );
}
