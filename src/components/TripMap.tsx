import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";

interface MapLocation {
  name: string;
  lat: number;
  lng: number;
  description?: string;
}

interface TripMapProps {
  destination: string;
  locations?: MapLocation[];
  apiKey: string;
}

const destinationCoords: Record<string, { lat: number; lng: number }> = {
  Goa: { lat: 15.2993, lng: 74.124 },
  Manali: { lat: 32.2396, lng: 77.1887 },
  Kerala: { lat: 10.8505, lng: 76.2711 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Rishikesh: { lat: 30.0869, lng: 78.2676 },
  Udaipur: { lat: 24.5854, lng: 73.7125 },
  Varanasi: { lat: 25.3176, lng: 82.9739 },
  Darjeeling: { lat: 27.036, lng: 88.2627 },
};

const defaultLocations: Record<string, MapLocation[]> = {
  Goa: [
    { name: "Baga Beach", lat: 15.5554, lng: 73.7514, description: "Popular beach with water sports" },
    { name: "Fort Aguada", lat: 15.4929, lng: 73.7737, description: "17th century Portuguese fort" },
    { name: "Chapora Fort", lat: 15.6048, lng: 73.7394, description: "Iconic sunset viewpoint" },
    { name: "Palolem Beach", lat: 15.0100, lng: 74.0232, description: "Serene crescent beach" },
    { name: "Dudhsagar Falls", lat: 15.3144, lng: 74.3143, description: "Stunning 4-tier waterfall" },
  ],
  Manali: [
    { name: "Hadimba Temple", lat: 32.2427, lng: 77.1697, description: "Ancient cave temple in cedar forest" },
    { name: "Solang Valley", lat: 32.3151, lng: 77.1570, description: "Adventure sports hub" },
    { name: "Rohtang Pass", lat: 32.3714, lng: 77.2474, description: "High mountain pass at 3,978m" },
    { name: "Old Manali", lat: 32.2559, lng: 77.1886, description: "Bohemian village vibes" },
    { name: "Jogini Waterfall", lat: 32.2547, lng: 77.1816, description: "Hidden waterfall trek" },
  ],
  Kerala: [
    { name: "Alleppey Backwaters", lat: 9.4981, lng: 76.3388, description: "Houseboat paradise" },
    { name: "Munnar Tea Gardens", lat: 10.0889, lng: 77.0595, description: "Rolling green tea plantations" },
    { name: "Fort Kochi", lat: 9.9639, lng: 76.2424, description: "Historic colonial quarter" },
    { name: "Periyar Wildlife", lat: 9.4680, lng: 77.2338, description: "Tiger reserve & boat rides" },
    { name: "Marari Beach", lat: 9.5953, lng: 76.2866, description: "Quiet golden beach" },
  ],
  Jaipur: [
    { name: "Amber Fort", lat: 26.9855, lng: 75.8513, description: "Majestic hillside fort" },
    { name: "Hawa Mahal", lat: 26.9239, lng: 75.8267, description: "Palace of Winds" },
    { name: "City Palace", lat: 26.9258, lng: 75.8237, description: "Royal Rajput palace complex" },
    { name: "Nahargarh Fort", lat: 26.9372, lng: 75.8150, description: "Panoramic city views" },
    { name: "Jantar Mantar", lat: 26.9249, lng: 75.8244, description: "Astronomical instruments" },
  ],
};

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f5f2ed" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9d7e4" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#e8e0d6" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#d4e6c8" }] },
];

const TripMap = ({ destination, locations, apiKey }: TripMapProps) => {
  const [selectedMarker, setSelectedMarker] = useState<MapLocation | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const center = useMemo(() => {
    return destinationCoords[destination] || { lat: 20.5937, lng: 78.9629 };
  }, [destination]);

  const markers = locations || defaultLocations[destination] || [];

  if (loadError) {
    return (
      <div className="w-full h-[400px] rounded-2xl bg-muted flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Map failed to load. Please check your API key.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] rounded-2xl bg-muted animate-pulse flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-card border border-border">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={destination ? 10 : 5}
        options={{
          styles: mapStyles,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {markers.map((loc, i) => (
          <MarkerF
            key={i}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setSelectedMarker(loc)}
            icon={{
              url: "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.2 0 0 7.2 0 16c0 12 16 24 16 24s16-12 16-24C32 7.2 24.8 0 16 0z" fill="#f97316"/><circle cx="16" cy="16" r="6" fill="white"/></svg>`),
              scaledSize: new google.maps.Size(32, 40),
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindowF
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-1">
              <h4 className="font-bold text-sm" style={{ color: "#1a1a2e" }}>{selectedMarker.name}</h4>
              {selectedMarker.description && (
                <p className="text-xs mt-1" style={{ color: "#666" }}>{selectedMarker.description}</p>
              )}
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
};

// Fallback map without API key
export const TripMapFallback = ({ destination }: { destination: string }) => {
  const markers = defaultLocations[destination] || [];

  return (
    <div className="w-full h-[400px] rounded-2xl bg-muted border border-border overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-hero mx-auto flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-foreground">{destination} Trip Locations</h4>
            <p className="text-sm text-muted-foreground mt-1">{markers.length} places to visit</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center max-w-sm">
            {markers.map((m) => (
              <span key={m.name} className="px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-foreground shadow-sm">
                📍 {m.name}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Add a Google Maps API key to enable interactive maps</p>
        </div>
      </div>
    </div>
  );
};

export default TripMap;
