import { useLocation, useNavigate } from "react-router-dom";
import { DeltagerDTO, Disciplin, Køn } from "../services/entityFacade";
import { useEffect, useState } from "react";
import { getDiscipliner, addDeltager, updateDeltager, deleteDeltager } from "../services/apiFacade";

const EMPTY_DELTAGER: DeltagerDTO = {
    id: 0,
    navn: "",
    fødselsdato: "",
    landKode: "",
    email: "",
    køn: Køn.MAND,
    klub: "",
    aldersgruppe: "",
    disciplinIds: [],
    resultatIds: [],
};

export default function DeltagerForm() {
    const navigate = useNavigate();
    const deltager = useLocation().state || null;
    const [formData, setFormData] = useState<DeltagerDTO>(deltager || EMPTY_DELTAGER);
    const [discipliner, setDiscipliner] = useState<Disciplin[]>([]);
    const [valgteDiscipliner, setValgteDiscipliner] = useState<string[]>([]);

    useEffect(() => {
        getDiscipliner().then((data) => setDiscipliner(data));

        if (deltager && deltager.discipliner) {
            setValgteDiscipliner(deltager.discipliner);
        }
    }, [deltager]);

    function handleDisciplinChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const valgte = Array.from(e.target.selectedOptions, (option) => option.value);
        setValgteDiscipliner(valgte);
        setFormData({
            ...formData,
            disciplinIds: valgte.map(Number), // Konverterer til tal da vi gemmer disciplin id'er
        });
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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (deltager) {
            await updateDeltager(formData);
        } else {
            await addDeltager(formData);
        }
        navigate("/");
    }

    async function handleDelete() {
        if (deltager) {
            if (confirm("Er du sikker på at du vil slette denne deltager?")) {
                const res = await deleteDeltager(deltager.id);
                if (res.ok) {
                    navigate("/");
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
                <label className="block mb-2 text-sm font-medium text-gray-900">Fødselsdato</label>
                <input
                    type="date"
                    name="fødselsdato"
                    value={formData.fødselsdato}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Landkode</label>
                <input
                    type="text"
                    name="landKode"
                    value={formData.landKode}
                    onChange={handleChange}
                    maxLength={2}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Køn</label>
                <select name="køn" value={formData.køn} onChange={handleSelectChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={Køn.MAND}>Mand</option>
                    <option value={Køn.KVINDE}>Kvinde</option>
                    <option value={Køn.ANDET}>Andet</option>
                </select>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">Klub</label>
                <input type="text" name="klub" value={formData.klub} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Discipliner</label>
                <select
                    name="discipliner"
                    multiple
                    value={valgteDiscipliner}
                    onChange={handleDisciplinChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                    {discipliner.map((disciplin) => (
                        <option key={disciplin.id} value={disciplin.id}>
                            {disciplin.navn}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-between">
                <button type="submit" className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-lg">
                    Gem Deltager
                </button>
                {deltager && (
                    <button type="button" onClick={handleDelete} className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg ml-2">
                        Slet Deltager
                    </button>
                )}
            </div>
        </form>
    );
}
