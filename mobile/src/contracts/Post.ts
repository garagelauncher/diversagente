export interface Post {
  title: string;
  content: string;
  ownerId: string;
  category?: string;
  subcategory?: string;
  image?: string;
  imageDescription?: string;
}
