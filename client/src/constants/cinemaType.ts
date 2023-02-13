export enum CINEMA_TYPE {
    MOVIE = "movie",
    SERIAL = "serial"
}

export const CINEMA_TYPE_VALUE: { [key in CINEMA_TYPE]: string } = {
    [CINEMA_TYPE.MOVIE]: "Movie",
    [CINEMA_TYPE.SERIAL]: "TV Series"
};