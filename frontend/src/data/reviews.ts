export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  company?: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export const initialReviews: ProductReview[] = [];

