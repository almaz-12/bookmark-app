export interface Bookmark {
  id: number;
  category_id: number;
  url: string;
  title: string;
  description: string;
  image: string;
  created_at: string;
}
export interface SortOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}
