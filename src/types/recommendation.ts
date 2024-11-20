export interface Recommendation {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  rating: number;
  price_level: string;
  description?: string;
  neighborhood?: string;
  hours?: string;
  image: string;
  images?: string[];
  created_at?: string;
  updated_at?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  instagram?: string;
  phone?: string;
  our_review?: string;
  destination_id: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  country: string;
  region: string;
}

export interface RecommendationWithDestination extends Recommendation {
  destinations: {
    id: string;
    name: string;
  };
}
