import { CINEMA_TYPE } from "../constants/cinemaType";

interface Base {
    id: string;
    title: string;
    year: string;
    age: number;
    type: CINEMA_TYPE;
}

export interface ITrailer extends Base {
    videoUrl: string;
    imageSrc: string;
    duration: number;
}

export interface ICinema extends Base {
    description: string;
    posterSrc: string;
    genres: string[];
    countries: string[];
    budget: number;
    profit: number;
    directors: string[];
    screenwriters: string[];
    composers: string[];
    actors: { name: string; id: string }[];
    story: string;
}
