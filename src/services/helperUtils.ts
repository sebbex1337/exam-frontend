import { Disciplin } from "./entityFacade";

export function calculateAge(birthdayStr: string) {
    const birthday = new Date(birthdayStr);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function formatDiscipliner(discipliner: Disciplin[]) {
    return discipliner.map((disciplin) => disciplin.navn).join(", ");
}

export function formatResultat(resultat: number, resultatType: string) {
    switch (resultatType) {
        case "AFSTAND":
            return `${resultat} m`;
        case "TID": {
            // Convert to minutes:seconds format
            const minutter: number = Math.floor(resultat / 60);
            const sekunder: number = resultat % 60;
            return `${minutter.toString().padStart(2, "0")}:${sekunder.toString().padStart(2, "0")} mm:ss`;
        }
        case "POINT":
            return `${Math.ceil(resultat)} point`;
        default:
            return resultat; // Should never happen, result should always have a type
    }
}

export function formatDato(datoTid: string): string {
    const dato = new Date(datoTid);

    const dag = dato.getDate().toString().padStart(2, "0");
    const måned = (dato.getMonth() + 1).toString().padStart(2, "0");
    const år = dato.getFullYear();
    return `${dag}-${måned}-${år}`;
}
