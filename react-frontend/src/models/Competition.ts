import { FootballClub } from './FootballClub';

export interface Competition {
    id?: number;
    name: string;
    number_of_participants: number;
    total_prizes: number;
    ko_stages: boolean;
    edition: number;
    clubs?: FootballClub[];
}
