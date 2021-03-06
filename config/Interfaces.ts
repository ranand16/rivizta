export interface Superpower { superpowerId: number, superpower: string }
export interface Superhero {
    id: number,
    superhero: string,
    characters: string,
    alter_ego: string,
    first_appearance: string,
    lasttimeupdated: number,
    publisher: string,
    superpowers: string,
    timecreated: number
}

export type ModalMode  = "ADD" | "EDIT";

export interface SuperPowerModalMode {
    id: number,
    superpower: string
} 