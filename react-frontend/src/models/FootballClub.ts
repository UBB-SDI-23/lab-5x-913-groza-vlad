import { Competition } from "./Competition";
import { FootballPlayer } from "./FootballPlayer";

export interface FootballClub {
    id?: number;
    name: string;
    establishment_year: number;
    country: string;
    city: string;
    budget: number;
    home_kit: string;
    competitions?: Competition[];
    players?: FootballPlayer[];
}