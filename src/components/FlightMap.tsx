import { useState, useEffect } from 'react';
import { AirplaneIcon } from './AirplaneIcon';
import { AirplaneCluster } from './AirplaneCluster';
import { FlightInfoPanel } from './FlightInfoPanel';
import { WeatherAlertBanner } from './WeatherAlertBanner';
import { WeatherOverlay } from './WeatherOverlay';
import { WeatherLayerOverlay } from './WeatherLayerOverlay';
import { WeatherLayers } from './WeatherPage';
import { ImageWithFallback } from './figma/ImageWithFallback';
import worldMap from 'figma:asset/16ffd77f038dd949f5a17c5cd3a5e64a6c97fa06.png';

interface Flight {
  id: string;
  lat: number;
  lng: number;
  rotation: number;
  altitude: number; // in feet
  callsign: string;
  origin: string;
  destination: string;
  speed: number; // in knots
  aircraft: string;
  flightTime: string;
  airline: string;
  airlineColor: string;
  departureTime: string;
  arrivalTime: string;
}

interface WeatherAlert {
  id: string;
  type: 'volcanic';
  title: string;
  region: string;
  lat: number;
  lng: number;
  severity: 'high' | 'medium' | 'low';
}

interface FlightMapProps {
  zoomLevel: number;
  weatherAlertIndex: number;
  weatherLayers: WeatherLayers;
  searchQuery: string;
}

// Generate random flights for demonstration
const generateFlights = (): Flight[] => {
  const flights: Flight[] = [];
  const airports = [
    { code: 'LHR', name: 'London Heathrow' },
    { code: 'JFK', name: 'New York JFK' },
    { code: 'LAX', name: 'Los Angeles' },
    { code: 'DXB', name: 'Dubai' },
    { code: 'SIN', name: 'Singapore' },
    { code: 'HKG', name: 'Hong Kong' },
    { code: 'CDG', name: 'Paris CDG' },
    { code: 'FRA', name: 'Frankfurt' },
    { code: 'SYD', name: 'Sydney' },
    { code: 'NRT', name: 'Tokyo Narita' },
    { code: 'ICN', name: 'Seoul Incheon' },
    { code: 'DEL', name: 'Delhi' },
    { code: 'BOM', name: 'Mumbai' },
    { code: 'GRU', name: 'São Paulo' },
    { code: 'EZE', name: 'Buenos Aires' },
    { code: 'JNB', name: 'Johannesburg' },
    { code: 'CAI', name: 'Cairo' },
    { code: 'IST', name: 'Istanbul' },
    { code: 'SVO', name: 'Moscow' },
    { code: 'PEK', name: 'Beijing' },
    { code: 'PVG', name: 'Shanghai' },
    { code: 'BKK', name: 'Bangkok' },
    { code: 'KUL', name: 'Kuala Lumpur' },
    { code: 'CGK', name: 'Jakarta' },
    { code: 'MNL', name: 'Manila' },
    { code: 'MEX', name: 'Mexico City' },
    { code: 'YYZ', name: 'Toronto' },
    { code: 'YVR', name: 'Vancouver' },
    { code: 'ORD', name: 'Chicago' },
    { code: 'ATL', name: 'Atlanta' },
    { code: 'DFW', name: 'Dallas' },
    { code: 'MIA', name: 'Miami' },
    { code: 'SEA', name: 'Seattle' },
    { code: 'SFO', name: 'San Francisco' },
    { code: 'AKL', name: 'Auckland' },
    { code: 'PER', name: 'Perth' },
  ];

  const airlines = [
    { name: 'Emirates', code: 'EK', color: '#d71921' },
    { name: 'Delta', code: 'DL', color: '#003a70' },
    { name: 'United', code: 'UA', color: '#0076bd' },
    { name: 'British Airways', code: 'BA', color: '#075aaa' },
    { name: 'Lufthansa', code: 'LH', color: '#f9b700' },
    { name: 'Air France', code: 'AF', color: '#002157' },
    { name: 'Qatar Airways', code: 'QR', color: '#5c0632' },
    { name: 'Singapore Airlines', code: 'SQ', color: '#f4c443' },
    { name: 'Cathay Pacific', code: 'CX', color: '#00645b' },
    { name: 'Qantas', code: 'QF', color: '#e0001b' },
    { name: 'ANA', code: 'NH', color: '#19428c' },
    { name: 'Turkish Airlines', code: 'TK', color: '#c60c30' },
  ];

  const aircraftTypes = [
    'Boeing 777-300ER',
    'Airbus A380-800',
    'Boeing 787-9',
    'Airbus A350-900',
    'Boeing 737-800',
    'Airbus A320-200',
    'Boeing 747-8',
    'Airbus A330-300',
  ];

  // 30 regions covering the entire world - MORE EVENLY DISTRIBUTED
  const regions = [
    // North America - spread across continent
    { centerLat: 40.7, centerLng: -74.0, count: 8 }, // New York/USA
    { centerLat: 34.0, centerLng: -118.2, count: 7 }, // Los Angeles/USA
    { centerLat: 41.8, centerLng: -87.6, count: 6 }, // Chicago/USA
    { centerLat: 33.9, centerLng: -84.3, count: 5 }, // Atlanta/USA
    { centerLat: 47.6, centerLng: -122.3, count: 4 }, // Seattle/USA
    { centerLat: 29.7, centerLng: -95.3, count: 5 }, // Houston/USA
    { centerLat: 43.6, centerLng: -79.6, count: 5 }, // Toronto/Canada
    { centerLat: 49.2, centerLng: -123.1, count: 4 }, // Vancouver/Canada
    { centerLat: 19.4, centerLng: -99.1, count: 6 }, // Mexico City/Mexico
    
    // Europe - spread across continent
    { centerLat: 51.5, centerLng: -0.1, count: 7 }, // London/UK
    { centerLat: 48.8, centerLng: 2.3, count: 6 }, // Paris/France
    { centerLat: 50.1, centerLng: 8.7, count: 6 }, // Frankfurt/Germany
    { centerLat: 41.9, centerLng: 12.5, count: 5 }, // Rome/Italy
    { centerLat: 40.4, centerLng: -3.7, count: 5 }, // Madrid/Spain
    { centerLat: 59.3, centerLng: 18.0, count: 4 }, // Stockholm/Sweden
    
    // Asia - spread across continent
    { centerLat: 35.6, centerLng: 139.7, count: 8 }, // Tokyo/Japan
    { centerLat: 39.9, centerLng: 116.4, count: 8 }, // Beijing/China
    { centerLat: 31.2, centerLng: 121.5, count: 7 }, // Shanghai/China
    { centerLat: 22.3, centerLng: 114.2, count: 6 }, // Hong Kong
    { centerLat: 37.5, centerLng: 126.9, count: 6 }, // Seoul/South Korea
    { centerLat: 1.3, centerLng: 103.8, count: 7 }, // Singapore
    { centerLat: 13.7, centerLng: 100.5, count: 6 }, // Bangkok/Thailand
    { centerLat: 28.6, centerLng: 77.2, count: 7 }, // Delhi/India
    { centerLat: 19.0, centerLng: 72.8, count: 6 }, // Mumbai/India
    { centerLat: 25.2, centerLng: 55.3, count: 8 }, // Dubai/UAE
    
    // Middle East & Africa
    { centerLat: 41.0, centerLng: 28.9, count: 6 }, // Istanbul/Turkey
    { centerLat: 30.0, centerLng: 31.2, count: 5 }, // Cairo/Egypt
    { centerLat: -26.2, centerLng: 28.0, count: 5 }, // Johannesburg/South Africa
    { centerLat: -1.2, centerLng: 36.8, count: 4 }, // Nairobi/Kenya
    
    // South America
    { centerLat: -23.5, centerLng: -46.6, count: 7 }, // São Paulo/Brazil
    { centerLat: -34.6, centerLng: -58.4, count: 5 }, // Buenos Aires/Argentina
    { centerLat: 4.7, centerLng: -74.0, count: 4 }, // Bogotá/Colombia
    
    // Oceania
    { centerLat: -33.8, centerLng: 151.2, count: 7 }, // Sydney/Australia
    { centerLat: -37.8, centerLng: 144.9, count: 5 }, // Melbourne/Australia
    { centerLat: -36.8, centerLng: 174.7, count: 4 }, // Auckland/New Zealand
    
    // Russia & Central Asia
    { centerLat: 55.7, centerLng: 37.6, count: 6 }, // Moscow/Russia
    { centerLat: 43.2, centerLng: 76.8, count: 4 }, // Almaty/Kazakhstan
    
    // Pacific Ocean routes
    { centerLat: 21.3, centerLng: -157.8, count: 3 }, // Honolulu/Hawaii
    { centerLat: 13.4, centerLng: 144.7, count: 3 }, // Guam
    
    // Atlantic Ocean routes
    { centerLat: 32.2, centerLng: -64.7, count: 3 }, // Bermuda
    { centerLat: 64.1, centerLng: -21.9, count: 3 }, // Reykjavik/Iceland
    
    // Southeast Asia & Pacific Islands
    { centerLat: 14.5, centerLng: 121.0, count: 5 }, // Manila/Philippines
    { centerLat: -6.2, centerLng: 106.8, count: 5 }, // Jakarta/Indonesia
    { centerLat: 3.1, centerLng: 101.6, count: 5 }, // Kuala Lumpur/Malaysia
  ];

  let flightNumber = 1;

  regions.forEach((region) => {
    for (let i = 0; i < region.count; i++) {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const origin = airports[Math.floor(Math.random() * airports.length)];
      const destination = airports[Math.floor(Math.random() * airports.length)];
      const aircraft = aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)];
      
      // Add some randomness to position within region
      const lat = region.centerLat + (Math.random() - 0.5) * 10;
      const lng = region.centerLng + (Math.random() - 0.5) * 15;

      const departureHour = Math.floor(Math.random() * 24);
      const departureMin = Math.floor(Math.random() * 60);
      const flightDuration = Math.floor(Math.random() * 10) + 2;
      const arrivalHour = (departureHour + flightDuration) % 24;
      const arrivalMin = (departureMin + Math.floor(Math.random() * 60)) % 60;

      flights.push({
        id: `FL${flightNumber++}`,
        lat,
        lng,
        rotation: Math.random() * 360,
        altitude: Math.floor(Math.random() * 35000) + 10000,
        callsign: `${airline.code}${Math.floor(Math.random() * 900) + 100}`,
        origin: origin.code,
        destination: destination.code,
        speed: Math.floor(Math.random() * 150) + 450,
        aircraft,
        flightTime: `${flightDuration}h ${Math.floor(Math.random() * 60)}m`,
        airline: airline.name,
        airlineColor: airline.color,
        departureTime: `${String(departureHour).padStart(2, '0')}:${String(departureMin).padStart(2, '0')}`,
        arrivalTime: `${String(arrivalHour).padStart(2, '0')}:${String(arrivalMin).padStart(2, '0')}`,
      });
    }
  });

  return flights;
};

const weatherAlerts: WeatherAlert[] = [
  {
    id: 'w1',
    type: 'volcanic',
    title: 'Volcanic Ash Cloud',
    region: 'Mount Merapi, Indonesia',
    lat: -7.54,
    lng: 110.45,
    severity: 'high',
  },
  {
    id: 'w2',
    type: 'volcanic',
    title: 'Volcanic Ash Cloud',
    region: 'Mount Etna, Italy',
    lat: 37.75,
    lng: 15.00,
    severity: 'high',
  },
  {
    id: 'w3',
    type: 'volcanic',
    title: 'Volcanic Ash Cloud',
    region: 'Klyuchevskoy, Russia',
    lat: 56.06,
    lng: 160.64,
    severity: 'medium',
  },
  {
    id: 'w4',
    type: 'volcanic',
    title: 'Volcanic Ash Cloud',
    region: 'Popocatépetl, Mexico',
    lat: 19.02,
    lng: -98.62,
    severity: 'medium',
  },
  {
    id: 'w5',
    type: 'volcanic',
    title: 'Volcanic Ash Cloud',
    region: 'Mount Nyiragongo, DR Congo',
    lat: -1.52,
    lng: 29.25,
    severity: 'high',
  },
];

export function FlightMap({ zoomLevel, weatherAlertIndex, weatherLayers, searchQuery }: FlightMapProps) {
  const [flights] = useState<Flight[]>(generateFlights());
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [highlightedFlightId, setHighlightedFlightId] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [showWeatherOverlay, setShowWeatherOverlay] = useState(false);
  const [isAnimatingToWeather, setIsAnimatingToWeather] = useState(false);
  const [spacingOffsets, setSpacingOffsets] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [isDismissed, setIsDismissed] = useState(false);

  const activeAlert = weatherAlertIndex > 0 && weatherAlertIndex <= weatherAlerts.length && !isDismissed
    ? weatherAlerts[weatherAlertIndex - 1] 
    : null;

  // Reset dismissed state when alert index changes
  useEffect(() => {
    setIsDismissed(false);
  }, [weatherAlertIndex]);

  // Handle flight search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setHighlightedFlightId(null);
      return;
    }

    // Search for flight by callsign or ID
    const foundFlight = flights.find(flight => 
      flight.callsign.toUpperCase() === searchQuery.toUpperCase() ||
      flight.id.toUpperCase() === searchQuery.toUpperCase()
    );

    if (foundFlight) {
      // Center on found flight
      const mapX = ((foundFlight.lng + 180) / 360) * 100;
      const mapY = ((90 - foundFlight.lat) / 180) * 100;
      
      const mapWidthPx = window.innerWidth * 2.4;
      const mapHeightPx = window.innerHeight * 1.4;
      
      const targetMapX = (mapX / 100) * mapWidthPx;
      const targetMapY = (mapY / 100) * mapHeightPx;
      
      const offsetFromCenterX = targetMapX - (mapWidthPx / 2);
      const offsetFromCenterY = targetMapY - (mapHeightPx / 2);
      
      setPan({
        x: -offsetFromCenterX,
        y: -offsetFromCenterY
      });

      setHighlightedFlightId(foundFlight.id);
      setSelectedFlight(foundFlight);
    } else {
      setHighlightedFlightId(null);
    }
  }, [searchQuery, flights]);

  const handleWeatherAlertTap = () => {
    if (!activeAlert) return;
    
    setIsAnimatingToWeather(true);
    setShowWeatherOverlay(true);

    // Calculate the pan needed to center the weather location
    // Map is 240vw x 140vh centered at viewport center
    // Convert lat/lng to map coordinates (0-100% of map dimensions)
    const mapX = ((activeAlert.lng + 180) / 360) * 100; // 0-100%
    const mapY = ((90 - activeAlert.lat) / 180) * 100; // 0-100%
    
    // Convert percentage to actual pixels on the full map
    // Map width is 240vw, height is 140vh
    const mapWidthPx = window.innerWidth * 2.4;
    const mapHeightPx = window.innerHeight * 1.4;
    
    // Calculate the position of the target on the map in pixels from the map's top-left
    const targetMapX = (mapX / 100) * mapWidthPx;
    const targetMapY = (mapY / 100) * mapHeightPx;
    
    // Calculate the offset from map center to target position
    const offsetFromCenterX = targetMapX - (mapWidthPx / 2);
    const offsetFromCenterY = targetMapY - (mapHeightPx / 2);
    
    // To center the target in viewport, we need to pan the map in the opposite direction
    // The pan values move the map, so negative values bring the target toward center
    setPan({
      x: -offsetFromCenterX,
      y: -offsetFromCenterY
    });

    setTimeout(() => {
      setIsAnimatingToWeather(false);
    }, 600);
  };

  const handleDismissAlert = () => {
    setShowWeatherOverlay(false);
    setIsDismissed(true);
  };

  // Handle mouse drag for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedFlight) return; // Don't pan if info panel is open
    setIsDragging(true);
    setHasDragged(false);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setHasDragged(true);
    
    const newPanX = e.clientX - dragStart.x;
    const newPanY = e.clientY - dragStart.y;
    
    // Calculate pan limits to prevent showing empty space
    // Map is 240vw x 140vh, viewport is 100vw x 100vh
    const mapWidth = window.innerWidth * 2.4;
    const mapHeight = window.innerHeight * 1.4;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Maximum pan distance (half the extra map size on each side, adjusted for scale)
    const maxPanX = ((mapWidth - viewportWidth) / 2) / scale;
    const maxPanY = ((mapHeight - viewportHeight) / 2) / scale;
    
    // Constrain pan within limits
    const constrainedPanX = Math.max(-maxPanX, Math.min(maxPanX, newPanX));
    const constrainedPanY = Math.max(-maxPanY, Math.min(maxPanY, newPanY));
    
    setPan({
      x: constrainedPanX,
      y: constrainedPanY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleFlightClick = (flight: Flight) => {
    if (!hasDragged) {
      setSelectedFlight(flight);
    }
  };

  // Calculate aircraft spacing based on zoom level - separates overlapping aircraft
  useEffect(() => {
    if (zoomLevel <= 1) {
      // At base zoom, no separation needed
      setSpacingOffsets(new Map());
      return;
    }

    // Convert all flights to screen coordinates
    const positions = new Map<string, { x: number; y: number }>();
    flights.forEach(flight => {
      const x = ((flight.lng + 180) / 360) * 100;
      const y = ((90 - flight.lat) / 180) * 100;
      positions.set(flight.id, { x, y });
    });

    // Apply separation algorithm - runs multiple iterations for smooth distribution
    const iterations = 12;
    const separationForce = zoomLevel * 0.18; // Force increases with zoom
    const minDistance = 0.8 + (zoomLevel * 0.15); // Minimum separation distance

    for (let iter = 0; iter < iterations; iter++) {
      const adjustments = new Map<string, { x: number; y: number }>();

      flights.forEach(flight => {
        const currentPos = positions.get(flight.id)!;
        let dx = 0;
        let dy = 0;

        // Check against all other flights
        flights.forEach(otherFlight => {
          if (flight.id === otherFlight.id) return;

          const otherPos = positions.get(otherFlight.id)!;
          const deltaX = currentPos.x - otherPos.x;
          const deltaY = currentPos.y - otherPos.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          // If too close, apply repulsion
          if (distance < minDistance && distance > 0.001) {
            const force = ((minDistance - distance) / distance) * separationForce;
            dx += deltaX * force;
            dy += deltaY * force;
          } else if (distance <= 0.001) {
            // Exact overlap - use deterministic offset based on ID
            const angle = (flight.id.charCodeAt(2) % 360) * (Math.PI / 180);
            dx += Math.cos(angle) * separationForce * 0.5;
            dy += Math.sin(angle) * separationForce * 0.5;
          }
        });

        adjustments.set(flight.id, {
          x: currentPos.x + dx,
          y: currentPos.y + dy
        });
      });

      // Apply adjustments
      adjustments.forEach((pos, id) => {
        positions.set(id, pos);
      });
    }

    // Calculate offsets from original positions
    const offsets = new Map<string, { x: number; y: number }>();
    flights.forEach(flight => {
      const originalX = ((flight.lng + 180) / 360) * 100;
      const originalY = ((90 - flight.lat) / 180) * 100;
      const adjustedPos = positions.get(flight.id)!;
      offsets.set(flight.id, {
        x: adjustedPos.x - originalX,
        y: adjustedPos.y - originalY
      });
    });

    setSpacingOffsets(offsets);
  }, [zoomLevel, flights]);

  const scale = 1 + zoomLevel * 0.3;

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#0a1628]"
      style={{
        cursor: isDragging ? 'grabbing' : (selectedFlight ? 'default' : 'grab'),
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={(e) => { const t = e.touches[0]; handleMouseDown({ clientX: t.clientX, clientY: t.clientY } as any); }}
      onTouchMove={(e) => { const t = e.touches[0]; handleMouseMove({ clientX: t.clientX, clientY: t.clientY } as any); }}
      onTouchEnd={() => handleMouseUp()}
      > 
    {/* Map Background - Full screen, edge-to-edge */}
      <div 
        className="absolute pointer-events-none z-0"
        style={{
          left: '50%',
          top: '50%',
          width: '240vw', // Extra width to fill edges with rotation
          height: '140vh', // Extra height to fill edges with rotation
          transform: `translate(-50%, -50%) scale(${scale}) translate(${pan.x}px, ${pan.y}px) rotateX(15deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
        }}
      >
        <ImageWithFallback
          src={worldMap}
          alt="World Map"
          className="w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            imageRendering: 'crisp-edges',
            WebkitFontSmoothing: 'antialiased',
          }}
        />
      </div>

      {/* Weather Overlay */}
      {showWeatherOverlay && activeAlert && (
        <div
          className="absolute z-5 pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: '240vw',
            height: '140vh',
            transform: `translate(-50%, -50%) scale(${scale}) translate(${pan.x}px, ${pan.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.6s ease-out',
            transformOrigin: 'center center',
          }}
        >
          <WeatherOverlay
            type={activeAlert.type}
            lat={activeAlert.lat}
            lng={activeAlert.lng}
            radius={15}
            active={showWeatherOverlay}
          />
        </div>
      )}

      {/* Weather Layer Overlays */}
      {(weatherLayers.volcanicEruption || weatherLayers.cloud || weatherLayers.precipitation) && (
        <div
          className="absolute z-5 pointer-events-none"
          style={{
            transform: `scale(${scale}) translate(${pan.x}px, ${pan.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
            transformOrigin: 'center center',
          }}
        >
          <WeatherLayerOverlay layers={weatherLayers} />
        </div>
      )}

      {/* Airplanes - ALL 230 aircraft always visible */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: '50%',
          top: '50%',
          width: '200vw',
          height: '100vh',
          transform: `translate(-50%, -50%) scale(${scale}) translate(${pan.x}px, ${pan.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease',
          transformOrigin: 'center center',
        }}
      >
        {/* Render ALL flights with spacing offsets applied */}
        {flights.map((flight) => {
          const offset = spacingOffsets.get(flight.id) || { x: 0, y: 0 };
          const baseX = ((flight.lng + 180) / 360) * 100;
          const baseY = ((90 - flight.lat) / 180) * 100;
          const adjustedX = baseX + offset.x;
          const adjustedY = baseY + offset.y;

          return (
            <div
              key={flight.id}
              className="absolute pointer-events-auto"
              style={{
                left: `${adjustedX}%`,
                top: `${adjustedY}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <AirplaneIcon
                lat={flight.lat}
                lng={flight.lng}
                rotation={flight.rotation}
                altitude={flight.altitude}
                callsign={flight.callsign}
                airlineColor={flight.airlineColor}
                onClick={() => handleFlightClick(flight)}
                isHighlighted={highlightedFlightId === flight.id}
              />
            </div>
          );
        })}
      </div>

      {/* Weather Alert Banner */}
      {activeAlert && (
        <WeatherAlertBanner
          alert={activeAlert}
          onTap={handleWeatherAlertTap}
          onDismiss={handleDismissAlert}
        />
      )}

      {/* Flight Info Panel */}
      {selectedFlight && (
        <FlightInfoPanel
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      )}
    </div>
  );
}
