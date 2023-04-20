import { FootballClub } from "./FootballClub";

export interface FootballPlayer {
    id?: number;
    first_name: string;
    last_name: string;
    nationality: string;
    age: number;
    position: string;
    club?: FootballClub;
    club_id?: number;
}