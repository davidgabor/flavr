import { RECOMMENDATIONS } from "@/data/recommendations";

export const cities = Object.entries(RECOMMENDATIONS).map(([id, city]) => ({
  id,
  name: city.name,
  image: city.image,
  recommendations: city.recommendations
}));