// 1. Basic Product (minimal data)
export interface BaseProduct {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  price: number;
  stock: number;
  condition: string;
  tags: string[];
  views: number;
  locationLat?: number;
  locationLng?: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isSold: boolean;
  averageRating: number;
  totalReviews: number;
  userId: number; // Just the ID reference
}

// 2. Product Card (for product listings)
export interface ProductCard extends BaseProduct {
  user: {
    id: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    rating: number;
    premiumTier: string;
  };
  images: {
    id: number;
    url: string;
  }[];
  // No reviews or delivery for card view
}

// 3. Product Detail (full data)
export interface ProductDetail extends BaseProduct {
  ratingDistribution?: Record<number, number>;
  user: {
    id: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string;
    rating: number;
    totalRatings: number;
    premiumTier: string;
    phone?: string;
  };
  images: {
    id: number;
    url: string;
  }[];
  delivery?: {
    id: number;
    method: string;
    location?: string;
    fee?: number;
  };
  reviews?: {
    id: number;
    rating: number;
    comment?: string;
    createdAt: string;
    reviewer: {
      id: number;
      username?: string;
      firstName?: string;
      lastName?: string;
      profilePic?: string;
    };
  }[];
}

// 4. Search Result (minimal for performance)
export interface ProductSearchResult {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  condition: string;
  averageRating: number;
  totalReviews: number;
  user: {
    username?: string;
    premiumTier: string;
  };
}
