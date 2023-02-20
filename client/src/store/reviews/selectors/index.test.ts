import { selectReviews } from ".";
import { RootState } from "../..";
import { REVIEW_TYPE } from "../../../constants/reviewTypes";
import { IReview } from "../../../models/review";
import { ReviewsState } from "../reviewsSlice";

describe("Reviews selectors", () => {
    test("Select reviews with empty list", () => {
        const reviews: ReviewsState = {
            isLoading: false,
            error: null,
            list: [],
            totalCount: 0,
        };

        const result = selectReviews({ reviews } as RootState);

        expect(result).toEqual(reviews);
    });

    test("Select reviews with filled list", () => {
        const reviewsItems: IReview[] = [
            {
                type: REVIEW_TYPE.POSITIVE,
                title: "Magic or reality",
                text: "The period of the late nineties-the beginning of the two thousandth gave us a large number of great and high-quality films, which until today we review and enjoy every time, The Green Mile directed by Frank Darabont is just one of those films, and which I also recently reviewed. The film is based on Stephen King's novel The Green Mile.\n\nThe main role was played by the legendary Tom Hanks, who has long been included in the Hollywood list as one of the best charismatic and talented actors. The events in the film unfold in 1935, Tom played the role of the head of the prison block of death row named Paul Edgecombe. The work is not the most pleasant, because every day you have to deal with disgusting personalities sitting in prison cells, although not all of these personalities are disgusting, some of them look quite normal people, but you never know what they are thinking, after all, these people have committed murders, and Paul also has problems with health.\n\nEverything changes when the giant John Coffey (Michael Clarke Duncan) is brought to prison one day, and from that very moment a lot will change in life for Paul and his work colleagues.",
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
                title: "The moment when a dozen negative comments are closer than three hundred positive ones.",
                text: "Like many people, the second place in the rating of the best films on KINOPOISK made me watch The Green Mile. Since I really love 'Escape from the Shawshank' and have a very good relationship with director Frank Darabont, I sat down to watch with the feeling that I would see another masterpiece. The first notes of bewilderment arose at the sight of flies (?) flying out of John Coffey's mouth, but I thought, okay, this is probably a film with elements of fiction. But gradually my bewilderment turned into a question: how did this film get to the second line?",
                cinemaId: "1",
                dislikesAmount: 56,
                isDisliked: false,
                isLiked: false,
                likesAmount: 30,
                id: "L-FX2uk2cOMeT4tLch64d",
                date: "2023-02-15T14:06:37.730Z",
            },
        ];
        const reviews: ReviewsState = {
            isLoading: true,
            error: null,
            list: [...reviewsItems],
            totalCount: reviewsItems.length,
        };

        const result = selectReviews({ reviews } as RootState);

        expect(result).toEqual(reviews);
    });
});
