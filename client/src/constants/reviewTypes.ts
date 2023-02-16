export enum REVIEW_TYPE {
    POSITIVE = "positive",
    NEGATIVE = "negative",
    NEUTRAL = "neutral",
    NONE = "none"
}

export const REVIEW_TYPE_VALUE: { [key in REVIEW_TYPE]: string } = {
    [REVIEW_TYPE.POSITIVE]: "Positives",
    [REVIEW_TYPE.NEGATIVE]: "Negatives",
    [REVIEW_TYPE.NEUTRAL]: "Neutrals",
    [REVIEW_TYPE.NONE]: "None"
};
