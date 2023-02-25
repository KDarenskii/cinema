import { rest, DefaultBodyType, PathParams } from "msw";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import {
    ACTOR_ENDPOINT,
    BOOKMARK_ENDPOINT,
    CINEMA_ENDPOINT,
    LOGIN_ENDPOINT,
    REVIEW_ENDPOINT,
    TRAILER_ENDPOINT,
    TREND_ENDPOINT,
    USER_ENDPOINT,
} from "../../constants/endPoints";
import { REVIEW_TYPE } from "../../constants/reviewTypes";
import { IActor } from "../../models/actor";
import { ICinema, ITrailer } from "../../models/cinema";
import { IReview } from "../../models/review";

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
    rest.get<DefaultBodyType, PathParams, ITrailer>(TRAILER_ENDPOINT + "/:id", (req, res, ctx) => {
        return res(
            ctx.json({
                imageSrc: "Src",
                title: "Trailer title",
                type: CINEMA_TYPE.MOVIE,
                age: 16,
                year: "2000",
                duration: 2,
                id: "1",
            }),
            ctx.delay(200)
        );
    }),
    rest.get<DefaultBodyType, PathParams, IActor>(ACTOR_ENDPOINT, (req, res, ctx) => {
        return res(
            ctx.json({
                id: "1",
                posterSrc: "Src",
                name: "Test actor name",
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
    rest.post<DefaultBodyType, PathParams, DefaultBodyType>(LOGIN_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(200, "Logged in"));
    }),
    rest.post<DefaultBodyType, PathParams, DefaultBodyType>(USER_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(200, "Signed up"));
    }),
    rest.post<DefaultBodyType, PathParams, DefaultBodyType>(REVIEW_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.get<DefaultBodyType, PathParams, DefaultBodyType>(BOOKMARK_ENDPOINT, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    imageSrc: "Src",
                    title: "Movie title",
                    type: CINEMA_TYPE.MOVIE,
                    age: 16,
                    year: "2000",
                    duration: 2,
                    id: "1",
                },
                {
                    imageSrc: "Src",
                    title: "Serial title",
                    type: CINEMA_TYPE.SERIAL,
                    age: 16,
                    year: "2000",
                    duration: 2,
                    id: "1",
                },
            ]),
            ctx.delay(200)
        );
    }),
    rest.post<ITrailer, PathParams, DefaultBodyType>(BOOKMARK_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(201), ctx.delay(200));
    }),
    rest.get<DefaultBodyType, PathParams, IReview[]>(REVIEW_ENDPOINT, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    type: REVIEW_TYPE.POSITIVE,
                    title: "Test review title",
                    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure facere, praesentium quam recusandae magnam, enim assumenda culpa cupiditate laudantium iusto ipsum ipsa molestias accusamus id. Deleniti, nobis quod. Soluta, explicabo.",
                    cinemaId: "1",
                    dislikesAmount: 32,
                    isDisliked: false,
                    isLiked: false,
                    likesAmount: 100,
                    id: "J-2K1yWup3kSNAH8HRXmU",
                    date: "2023-02-15T14:05:22.657Z",
                },
                {
                    type: REVIEW_TYPE.NEGATIVE,
                    title: "Test review title",
                    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure facere, praesentium quam recusandae magnam, enim assumenda culpa cupiditate laudantium iusto ipsum ipsa molestias accusamus id. Deleniti, nobis quod. Soluta, explicabo.",
                    cinemaId: "1",
                    dislikesAmount: 56,
                    isDisliked: false,
                    isLiked: false,
                    likesAmount: 30,
                    id: "L-FX2uk2cOMeT4tLch64d",
                    date: "2023-02-15T14:06:37.730Z",
                },
            ]),
            ctx.delay(200)
        );
    }),
    rest.get<DefaultBodyType, PathParams, ICinema>(CINEMA_ENDPOINT, (req, res, ctx) => {
        return res(
            ctx.json({
                id: "1",
                type: CINEMA_TYPE.MOVIE,
                title: "Test cinema title",
                description: "Description text",
                posterSrc: "Poster src",
                genres: ["fantasy", "crime", "drama"],
                countries: ["USA"],
                budget: 60000000,
                age: 16,
                year: "1999",
                profit: 136000000,
                directors: ["Frank Darabont"],
                screenwriters: ["Frank Darabont", "Stiven King"],
                composers: ["Thomas Newman"],
                actors: [
                    {
                        name: "Test actor name",
                        id: "1",
                    },
                ],
                videoId: "Ki4haFrqSrw",
                story: "lorem kmgfo fdskmf lfds lkmfdskm fksdmkl fs mfsd",
            }),
            ctx.delay(200)
        );
    }),
    rest.get<DefaultBodyType, PathParams, ICinema>(CINEMA_ENDPOINT + "/:id", (req, res, ctx) => {
        return res(
            ctx.json({
                id: "1",
                type: CINEMA_TYPE.MOVIE,
                title: "Test cinema title",
                description: "Description text",
                posterSrc: "Poster src",
                genres: ["fantasy", "crime", "drama"],
                countries: ["USA"],
                budget: 60000000,
                age: 16,
                year: "1999",
                profit: 136000000,
                directors: ["Frank Darabont"],
                screenwriters: ["Frank Darabont", "Stiven King"],
                composers: ["Thomas Newman"],
                actors: [
                    {
                        name: "Test actor name",
                        id: "1",
                    },
                ],
                videoId: "Ki4haFrqSrw",
                story: "lorem kmgfo fdskmf lfds lkmfdskm fksdmkl fs mfsd",
            }),
            ctx.delay(200)
        );
    }),
];
