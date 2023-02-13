export interface IActor {
    id: string;
    posterSrc: string;
    name: string;
    career: string[];
    height: number;
    birthplace: {
        city: string;
        state: string;
        country: string;
    };
    genres: string[];
    filmsNumber: number;
    bestWorks: { title: string; id: string }[];
}
