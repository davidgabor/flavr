export interface Recommendation {
  id: string;
  name: string;
  type: string;
  cuisine: string;
  rating: number;
  priceLevel: string;
  description?: string;
  neighborhood?: string;
  hours?: string;
  image: string;
}

export interface City {
  name: string;
  image: string;
  description: string;
  recommendations: Recommendation[];
}