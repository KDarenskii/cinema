import { rest, DefaultBodyType, PathParams } from "msw";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { ACTOR_ENDPOINT, TRAILER_ENDPOINT, TREND_ENDPOINT } from "../../constants/endPoints";
import { LOGIN_ROUTE } from "../../constants/routesPathnames";
import { IActor } from "../../models/actor";
import { ITrailer } from "../../models/cinema";

export const handlers = [
    rest.get<DefaultBodyType, PathParams, ITrailer[]>(TREND_ENDPOINT, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    imageSrc: "Src",
                    title: "Trending film",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "2000",
                    duration: 2,
                    id: "1",
                },
            ])
        );
    }),
    rest.get<DefaultBodyType, PathParams, ITrailer[]>(TRAILER_ENDPOINT, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    imageSrc: "Src",
                    title: "Trailer title",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "2000",
                    duration: 2,
                    id: "1",
                },
            ])
        );
    }),
    rest.get<DefaultBodyType, PathParams, IActor>(ACTOR_ENDPOINT + "/:id", (req, res, ctx) => {
        return res(
            ctx.delay(500),
            ctx.json({
                id: "1",
                posterSrc: "Src",
                name: "Name Surname",
                career: ["Actor", "Director", "Screenwriter"],
                height: 180,
                birthplace: {
                    city: "Konkord",
                    state: "California",
                    country: "USA",
                },
                genres: ["drama", "comedy", "fantasy"],
                filmsNumber: 409,
                bestWorks: [
                    {
                        title: "Best Film",
                        id: "10",
                    },
                ],
            })
        );
    }),
    rest.post<DefaultBodyType, PathParams, DefaultBodyType>("/login", (req, res, ctx) => {
        return res(ctx.status(200, "Logged in"));
    }),
    rest.post<DefaultBodyType, PathParams, DefaultBodyType>("/users", (req, res, ctx) => {
        return res(ctx.status(200, "Signed up"));
    }),
    rest.post<DefaultBodyType, PathParams, DefaultBodyType>("/reviews", (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
