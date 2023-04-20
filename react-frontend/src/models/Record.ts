import { Competition } from "./Competition";
import { FootballClub } from "./FootballClub";


export interface Record {
    id: number;
    club_id?: number;
    competition_id?: number;
    club?: FootballClub;
    competition?: Competition;
    trophies_won: number;
    no_of_participations: number;
}