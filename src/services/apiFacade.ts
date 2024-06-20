import { DeltagerDTO, ResultatDTO } from "./entityFacade";
import { handleHttpErrors, makeOptions } from "./fetchUtils";

const API_URL = "http://localhost:8080";
const DELTAGER_URL = API_URL + "/api/deltagere";
const DISCIPLIN_URL = API_URL + "/api/discipliner";
const RESULTAT_URL = API_URL + "/api/resultater";

export async function getDeltagere() {
    return await fetch(DELTAGER_URL).then(handleHttpErrors);
}

export async function getDiscipliner() {
    return await fetch(DISCIPLIN_URL).then(handleHttpErrors);
}

export async function addDeltager(deltager: DeltagerDTO) {
    const options = makeOptions("POST", deltager);
    return await fetch(DELTAGER_URL, options).then(handleHttpErrors);
}

export async function updateDeltager(deltager: DeltagerDTO) {
    const options = makeOptions("PUT", deltager);
    return await fetch(DELTAGER_URL + "/" + deltager.id, options).then(handleHttpErrors);
}

export async function deleteDeltager(id: number) {
    const options = makeOptions("DELETE", null);
    return await fetch(DELTAGER_URL + "/" + id, options).then((res) => res);
}

export async function søgDeltager(navn: string) {
    return await fetch(DELTAGER_URL + "/search/" + navn).then(handleHttpErrors);
}

export async function opdaterResultat(resultatDTO: ResultatDTO) {
    const options = makeOptions("PUT", resultatDTO);
    return await fetch(`${RESULTAT_URL}/${resultatDTO.id}`, options).then(handleHttpErrors);
}
