import { useLocation } from "react-router-dom";
import { Disciplin } from "../services/entityFacade";

export default function DisciplinDetailViewPage() {
    const disciplin = useLocation().state as Disciplin;

    console.log(disciplin);

    return (
        <div>
            <h1>Disciplin detaljer</h1>
        </div>
    );
}
