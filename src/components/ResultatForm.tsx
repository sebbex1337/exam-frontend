import { useEffect, useState } from "react";
import { Deltager, ResultatDTO } from "../services/entityFacade";
import { opretResultat } from "../services/apiFacade";
import { useNavigate } from "react-router-dom";

interface props {
    deltager: Deltager;
}

const EMPTY_RESULTAT: ResultatDTO = {
    id: 0,
    deltagerId: 0,
    resultat: 0,
    dato: "",
    disciplinId: 0,
};

export default function ResultatForm({ deltager }: props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ResultatDTO>(EMPTY_RESULTAT);

    useEffect(() => {
        if (deltager) {
            setFormData({
                ...formData,
                deltagerId: Number(deltager.id),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deltager]);

    function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setFormData({
            ...formData,
            [e.target.name]: Number(e.target.value),
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await opretResultat(formData);
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Vælg disciplin</label>
                <select name="disciplinId" defaultValue="" onChange={handleSelectChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option disabled value="">
                        Vælg disciplin
                    </option>
                    {deltager.discipliner.map((disciplin) => (
                        <option key={disciplin.id} value={Number(disciplin.id)}>
                            {disciplin.navn}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Resultat</label>
                <input
                    type="text"
                    name="resultat"
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: Number(e.target.value) })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Dato</label>
                <input
                    type="date"
                    name="dato"
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="flex justify-between">
                <button type="submit" className="mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">
                    Gem Resultat
                </button>
            </div>
        </form>
    );
}
