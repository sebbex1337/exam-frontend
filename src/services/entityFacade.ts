export interface Deltager {
    id: number;
    navn: string;
    fødselsdato: string;
    aldersgruppe: string;
    køn: Køn;
    email: string;
    klub: string;
    landKode: string;
    discipliner: Disciplin[];
    resultater: Resultat[];
}

export interface DeltagerDTO {
    id: number;
    navn: string;
    fødselsdato: string;
    aldersgruppe: string;
    køn: Køn;
    email: string;
    klub: string;
    landKode: string;
    disciplinIds: number[];
    resultatIds: number[];
}

export interface Disciplin {
    id: number;
    navn: string;
    resultatType: ResultatType;
}

export interface Resultat {
    id: number;
    dato: string;
    disciplinNavn: string;
    resultat: number;
}

export interface ResultatDTO {
    id: number;
    dato: string;
    deltagerId: number;
    disciplinId: number;
    resultat: number;
}

export interface ResultatGETDTO {
    id: number;
    dato: string;
    disciplinNavn: string;
    resultat: number;
    deltager: Deltager;
}

export enum ResultatType {
    TID = "TID",
    AFSTAND = "AFSTAND",
    POINT = "POINT",
}

export enum Køn {
    MAND = "MAND",
    KVINDE = "KVINDE",
    ANDET = "ANDET",
}