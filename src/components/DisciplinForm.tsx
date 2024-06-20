import { useState } from "react";
import { Disciplin, ResultatType } from "../services/entityFacade";
import { useLocation, useNavigate } from "react-router-dom";
import { addDisciplin, deleteDisciplin, updateDisciplin } from "../services/apiFacade";

const EMPTY_DISCIPLIN: Disciplin = {
    id: 0,
    navn: "",
    resultatType: ResultatType.TID,
};

export default function DisciplinForm() {
    const navigate = useNavigate();
    const disciplin = useLocation().state as Disciplin;
    const [formData, setFormData] = useState<Disciplin>(disciplin || EMPTY_DISCIPLIN);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (disciplin) {
            await updateDisciplin(formData);
        } else {
            await addDisciplin(formData);
        }
        navigate("/discipliner");
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleDelete() {
        if (disciplin) {
            if (confirm("Er du sikker på at du vil slette denne disciplin?")) {
                const res = await deleteDisciplin(disciplin.id);
                if (res.ok) {
                    navigate("/discipliner");
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Navn</label>
                <input type="text" name="navn" value={formData.navn} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Resultat Type</label>
                <select
                    name="resultatType"
                    value={formData.resultatType}
                    onChange={handleSelectChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    <option value={ResultatType.TID}>Tid</option>
                    <option value={ResultatType.AFSTAND}>Afstand</option>
                    <option value={ResultatType.POINT}>Point</option>
                </select>
            </div>

            <div className="flex justify-between">
                <button type="submit" className="mt-5 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">
                    Gem Disciplin
                </button>
                {disciplin && (
                    <button type="button" onClick={handleDelete} className="mt-5 px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg ml-2">
                        Slet Disciplin
                    </button>
                )}
            </div>
        </form>
    );
}
