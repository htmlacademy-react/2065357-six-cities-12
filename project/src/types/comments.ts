import { User } from './user';

type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
};

export type Comments = Comment[];
