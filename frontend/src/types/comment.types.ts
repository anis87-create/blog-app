import { Author } from './article.types';

export type ReactionType = 'like' | 'dislike' | 'laugh' | 'love' | 'angry' | 'wow';

export interface Comment {
  _id: string;
  article: string;
  author: Author;
  content: string;
  parentComment: string | null;
  isEdited: boolean;
  isDeleted: boolean;
  likesCount: number;
  dislikesCount: number;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}
