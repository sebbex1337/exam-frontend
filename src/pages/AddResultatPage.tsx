import { useLocation } from "react-router-dom";
import { Deltager } from "../services/entityFacade";
import ResultatForm from "../components/ResultatForm";

export default function AddResultatPage() {
    const deltager = useLocation().state as Deltager;
    
    return (
        <div className="pt-8">
            <ResultatForm deltager={deltager} />
        </div>
    );
}
