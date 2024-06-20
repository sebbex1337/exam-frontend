import { useLocation } from "react-router-dom";
import { Deltager } from "../services/entityFacade";

export default function AddResultatPage() {
    const deltager = useLocation().state as Deltager;
    console.log(deltager);
    return (
        <div>
            <h1>Tilføj resultat</h1>
        </div>
    );
}
