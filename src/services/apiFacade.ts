import { handleHttpErrors } from "./fetchUtils";

const API_URL = "http://localhost:8080";
const DELTAGER_URL = API_URL + "/api/deltagere";
const DISCIPLIN_URL = API_URL + "/api/discipliner";
//const RESULTAT_URL = API_URL + "/api/resultater";

export async function getDeltagere() {
    return await fetch(DELTAGER_URL).then(handleHttpErrors);
}

export async function getDiscipliner() {
    return await fetch(DISCIPLIN_URL).then(handleHttpErrors);
}
