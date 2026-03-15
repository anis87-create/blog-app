export type Category = 'tech-news' | 'history' | 'art' | 'geography' | 'training' | 'culture';

export interface Author {
  _id: string;
  name: string;
  avatar: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  category: Category;
  tags: string[];
  author: Author;
  status: 'draft' | 'published' | 'archived';
  averageRating: number;
  ratingsCount: number;
  viewsCount: number;
  commentsCount: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ArticleFilters {
  category?: Category | '';
  search?: string;
  sort?: string;
  page?: number;
}
