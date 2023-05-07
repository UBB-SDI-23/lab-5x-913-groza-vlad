import { Competition } from "./Competition";
import { FootballClub } from "./FootballClub";


export interface Record {
    id: number;
    club_id?: FootballClub;
    competition_id?: Competition;
    club?: number;
    competition?: number;
    trophies_won: number;
    no_of_participations: number;
    user?: number;
}