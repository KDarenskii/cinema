import { CINEMA_TYPE } from "../constants/cinemaType";

export interface ICinema {
    url: string;
    src: string;
    id: string;
    year: number;
    type: CINEMA_TYPE
}