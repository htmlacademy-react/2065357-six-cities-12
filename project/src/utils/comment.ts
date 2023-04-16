import { Comment } from '../types/comment';

const convertDate = (date: string): string => new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

const convertToTwoDigit = (value: number): number | string => value < 10 ? `0${value}` : value;

const convertDateForDateTime = (date: string): string => {
  const d = new Date(date);

  return `${d.getFullYear()}-${convertToTwoDigit(d.getMonth() + 1)}-${convertToTwoDigit(d.getDate())}`;
};

const getSortedComments = (comments: Comment[]): Comment[] => [...comments].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const getRenderedComments = (comments: Comment[], count: number): Comment[] => {
  if (comments.length > count) {
    return comments.slice(0, count);
  }

  return comments;
};

export { convertDate, convertDateForDateTime, getSortedComments, getRenderedComments};
