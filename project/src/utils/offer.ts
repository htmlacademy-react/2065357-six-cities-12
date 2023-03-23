const STARS_COUNT = 5;

const convertRatingToPercent = (rating: number): number => Math.round(rating) * (100 / STARS_COUNT);

export { convertRatingToPercent };
