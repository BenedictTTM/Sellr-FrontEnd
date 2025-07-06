export interface Product {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
  condition: string;
  views: number;
  createdAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    rating: number;
    premiumTier: string;
  };
}