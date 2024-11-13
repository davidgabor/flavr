import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Clock } from "lucide-react";

const RECOMMENDATIONS = {
  copenhagen: {
    name: "Copenhagen",
    recommendations: [
      {
        id: "mangia-cph",
        name: "Mangia",
        type: "Restaurant",
        cuisine: "Italian",
        rating: 4.5,
        priceLevel: "$$$",
        neighborhood: "City Center",
        description: "Nice Italian restaurant",
        hours: "11:00 AM - 11:00 PM",
        popularDishes: ["Pasta", "Pizza"],
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
      },
      {
        id: "cafe-victor",
        name: "Café Victor",
        type: "Restaurant",
        cuisine: "Danish",
        rating: 4.7,
        priceLevel: "$$",
        neighborhood: "Nytorv",
        description: "Always good, traditional Danish cuisine",
        hours: "10:00 AM - 10:00 PM",
        popularDishes: ["Frikadeller", "Smørrebrød"],
        image: "https://images.unsplash.com/photo-1597512066862-69a9bcb983f4"
      },
      {
        id: "barabba",
        name: "Barabba",
        type: "Restaurant",
        cuisine: "Italian",
        rating: 4.6,
        priceLevel: "$$$",
        neighborhood: "Vesterbro",
        description: "Super great & interesting Italian",
        hours: "5:00 PM - 11:00 PM",
        popularDishes: ["Tagliatelle", "Tiramisu"],
        image: "https://images.unsplash.com/photo-1547024424-cf5dc9cf4e3c"
      },
      {
        id: "bottega-barlie",
        name: "Bottega Barlie",
        type: "Wine Bar",
        cuisine: "Danish",
        rating: 4.8,
        priceLevel: "$$",
        neighborhood: "Christianshavn",
        description: "Great wine bar with delicious small bites",
        hours: "3:00 PM - 12:00 AM",
        popularDishes: ["Cheese Platter", "Wine Pairing"],
        image: "https://images.unsplash.com/photo-1543393430-8b445b75e981"
      },
      {
        id: "bar-vitrine",
        name: "Bar Vitrine",
        type: "Restaurant",
        cuisine: "Danish",
        rating: 4.5,
        priceLevel: "$$$",
        neighborhood: "Vesterbro",
        description: "Great & interesting tasting menu + funky wines",
        hours: "5:00 PM - 10:00 PM",
        popularDishes: ["Vitrine Tasting Menu"],
        image: "https://images.unsplash.com/photo-1550143564-719010b16161"
      },
      {
        id: "salon",
        name: "Salon",
        type: "Restaurant",
        cuisine: "Danish",
        rating: 4.9,
        priceLevel: "$$$$",
        neighborhood: "Frederiksberg",
        description: "A favorite, traditional & excellent food & wines",
        hours: "12:00 PM - 10:00 PM",
        popularDishes: ["Danish Open Sandwiches"],
        image: "https://images.unsplash.com/photo-1506765511257-e9e548e660b2"
      },
      {
        id: "omar",
        name: "OMAR",
        type: "Restaurant",
        cuisine: "Danish",
        rating: 4.7,
        priceLevel: "$$$",
        neighborhood: "København K",
        description: "Far away, but great & interesting tasting menu + funky wines",
        hours: "6:00 PM - 11:00 PM",
        popularDishes: ["Chef's Special"],
        image: "https://images.unsplash.com/photo-1598028167587-35f35c91e558"
      },
      {
        id: "restaurant-montergade",
        name: "Restaurant Møntergade",
        type: "Restaurant",
        cuisine: "Danish",
        rating: 4.6,
        priceLevel: "$",
        neighborhood: "Indre By",
        description: "Great smørrebrød + traditional vibes",
        hours: "11:00 AM - 9:00 PM",
        popularDishes: ["Traditional Smørrebrød"],
        image: "https://images.unsplash.com/photo-1527810758662-60e581e76c6a"
      },
      {
        id: "restaurant-schonemann",
        name: "Restaurant Schønnemann",
        type: "Restaurant",
        cuisine: "Danish",
        rating: 5.0,
        priceLevel: "$$",
        neighborhood: "Indre By",
        description: "Best smørrebrød in town",
        hours: "11:30 AM - 5:00 PM",
        popularDishes: ["Open Sandwich"],
        image: "https://images.unsplash.com/photo-1519111222912-2f961e74f9d1"
      },
      {
        id: "fishmarket",
        name: "Fishmarket",
        type: "Restaurant",
        cuisine: "Seafood",
        rating: 4.4,
        priceLevel: "$$$",
        neighborhood: "Christianshavn",
        description: "Delicious seafood",
        hours: "12:00 PM - 10:00 PM",
        popularDishes: ["Fish Platter"],
        image: "https://images.unsplash.com/photo-1547919790-1281c2b73034"
      },
      {
        id: "pluto",
        name: "Pluto",
        type: "Restaurant",
        cuisine: "Danish",
        rating: 4.3,
        priceLevel: "$$",
        neighborhood: "Vesterbro",
        description: "Modern, small bites & great vibes late evening",
        hours: "5:00 PM - 12:00 AM",
        popularDishes: ["Small Plates"],
        image: "https://images.unsplash.com/photo-1531055541151-e75b6c07ad5b"
      },
      {
        id: "pastis",
        name: "Pastis",
        type: "Restaurant",
        cuisine: "French",
        rating: 4.2,
        priceLevel: "$$$",
        neighborhood: "Vesterbro",
        description: "Traditional, good entrecote",
        hours: "6:00 PM - 10:30 PM",
        popularDishes: ["Entrecôte"],
        image: "https://images.unsplash.com/photo-1504862971552-53b5524d3018"
      },
      {
        id: "locale-21",
        name: "Locale 21",
        type: "Restaurant",
        cuisine: "Italian",
        rating: 4.5,
        priceLevel: "$$",
        neighborhood: "København K",
        description: "Great Italian",
        hours: "11:00 AM - 9:00 PM",
        popularDishes: ["Pasta"],
        image: "https://images.unsplash.com/photo-1602033024160-2f3b8f97c2f5"
      },
      {
        id: "resto-bar",
        name: "Resto Bar",
        type: "Restaurant",
        cuisine: "French",
        rating: 4.6,
        priceLevel: "$$",
        neighborhood: "København K",
        description: "Great Italian/French, try the steak au poivre",
        hours: "5:00 PM - 11:00 PM",
        popularDishes: ["Steak au Poivre"],
        image: "https://images.unsplash.com/photo-1540423515-b0db3b4e06db"
      },
      {
        id: "ambra",
        name: "Ambra",
        type: "Restaurant",
        cuisine: "Italian",
        rating: 4.4,
        priceLevel: "$$",
        neighborhood: "Vesterbro",
        description: "Great Italian and good vibes late evening",
        hours: "5:00 PM - 11:00 PM",
        popularDishes: ["Pizza", "Pasta"],
        image: "https://images.unsplash.com/photo-1491333845822-c1e895e88fd1"
      },
      {
        id: "granola",
        name: "Granola",
        type: "Restaurant",
        cuisine: "Danish",
        rating: 4.6,
        priceLevel: "$",
        neighborhood: "Vesterbro",
        description: "Brunch",
        hours: "9:00 AM - 4:00 PM",
        popularDishes: ["Brunch Plate"],
        image: "https://images.unsplash.com/photo-1463041408243-622cd026b904"
      }
    ]
  },
  florence: {
    name: "Florence",
    recommendations: [
      {
        id: "vini-vecchi",
        name: "Vini e Vechhi Sapori",
        type: "Restaurant",
        cuisine: "Italian",
        rating: 4.8,
        priceLevel: "$$",
        neighborhood: "Historic Center",
        description: "Classic trattoria, perfect for wine lunch",
        hours: "12:00 PM - 10:00 PM",
        popularDishes: ["T-Bone Steak Florentina", "Wild Boar Ragù"],
        image: "https://images.unsplash.com/photo-1504574944307-502dacc1376c"
      },
      // Additional Florence recommendations will be added
    ]
  },
  barcelona: {
    name: "Barcelona",
    recommendations: [
      {
        id: "disfrutar",
        name: "Disfrutar",
        type: "Restaurant",
        cuisine: "Spanish",
        rating: 4.9,
        priceLevel: "$$$$",
        neighborhood: "Eixample",
        description: "Fine dining and outstanding tasting menus",
        hours: "1:00 PM - 2:30 PM / 8:00 PM - 10:00 PM",
        popularDishes: ["Signature Tasting Menu"],
        image: "https://images.unsplash.com/photo-1520677090886-c564224746ac"
      },
      // Additional Barcelona recommendations will be added
    ]
  },
  dublin: {
    name: "Dublin",
    recommendations: [
      {
        id: "spitalfields",
        name: "Spitalfields",
        type: "Restaurant",
        cuisine: "Irish",
        rating: 4.5,
        priceLevel: "$$",
        neighborhood: "West Dublin",
        description: "Traditional Irish dishes with a modern twist",
        hours: "12:00 PM - 10:00 PM",
        popularDishes: ["Irish Stew"],
        image: "https://images.unsplash.com/photo-1555685796-620d2d08c0bf"
      },
      // Additional Dublin recommendations will be added
    ]
  },
  nyc: {
    name: "New York City",
    recommendations: [
      {
        id: "joes-pizza",
        name: "Joe's Pizza",
        type: "Restaurant",
        cuisine: "Italian",
        rating: 4.8,
        priceLevel: "$$",
        neighborhood: "Greenwich Village",
        description: "A classic New York institution serving authentic pizza.",
        hours: "10:00 AM - 4:00 AM",
        popularDishes: ["Classic Cheese Slice", "Pepperoni Slice"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      },
      {
        id: "smith-and-wollensky",
        name: "Smith & Wollensky",
        type: "Restaurant",
        cuisine: "American",
        rating: 4.7,
        priceLevel: "$$$$",
        neighborhood: "Midtown",
        description: "Renowned for its great steaks and wine selection.",
        hours: "11:30 AM - 11:00 PM",
        popularDishes: ["Wagyu Steak", "Lobster"],
        image: "https://images.unsplash.com/photo-1572259439652-642c23d15431"
      },
      // Additional NYC recommendations will be added
    ]
  },
  capetown: {
    name: "Cape Town",
    recommendations: [
      // Cape Town recommendations structure
    ]
  },
  london: {
    name: "London",
    recommendations: [
      // London recommendations structure
    ]
  },
  stockholm: {
    name: "Stockholm",
    recommendations: [
      // Stockholm recommendations structure
    ]
  },
  paris: {
    name: "Paris",
    recommendations: [
      // Paris recommendations structure
    ]
  },
  losangeles: {
    name: "Los Angeles",
    recommendations: [
      // Los Angeles recommendations structure
    ]
  },
  dubai: {
    name: "Dubai",
    recommendations: [
      // Dubai recommendations structure
    ]
  },
  milan: {
    name: "Milan",
    recommendations: [
      // Milan recommendations structure
    ]
  },
  malaga: {
    name: "Malaga",
    recommendations: [
      // Malaga recommendations structure
    ]
  }
};

const CityDetails = () => {
  const { cityId } = useParams();
  const cityData = RECOMMENDATIONS[cityId as keyof typeof RECOMMENDATIONS];

  if (!cityData) {
    return (
      <div className="text-center py-16">
        <h1 className="heading-1">City not found</h1>
        <Link to="/cities" className="text-primary hover:underline">
          Back to Cities
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="heading-1">{cityData.name}</h1>
        <p className="text-body text-lg">
          Discover the best local spots in {cityData.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cityData.recommendations.map((recommendation) => (
          <Link
            to={`/recommendations/${recommendation.id}`}
            key={recommendation.id}
            className="card group"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={recommendation.image}
                alt={recommendation.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">{recommendation.name}</h2>
                <span className="text-neutral-600">{recommendation.priceLevel}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
                <span>{recommendation.type}</span>
                <span>•</span>
                <span>{recommendation.cuisine}</span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <MapPin size={16} className="text-neutral-500" />
                  <span className="text-sm text-neutral-600">
                    {recommendation.neighborhood}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-primary" />
                  <span className="text-sm text-neutral-600">
                    {recommendation.rating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityDetails;
