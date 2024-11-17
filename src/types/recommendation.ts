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
  created_at?: string;
  updated_at?: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  country: string;
}