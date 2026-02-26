import { X, Plane, MapPin, Clock, Gauge } from 'lucide-react';

interface FlightInfoPanelProps {
  flight: {
    callsign: string;
    origin: string;
    destination: string;
    altitude: number;
    speed: number;
    aircraft: string;
    flightTime: string;
    airline: string;
    airlineColor: string;
    departureTime: string;
    arrivalTime: string;
  } | null;
  onClose: () => void;
}

export function FlightInfoPanel({ flight, onClose }: FlightInfoPanelProps) {
  if (!flight) return null;

  return (
    <div className="absolute top-32 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Header - Dark gray background */}
        <div className="px-4 py-3 flex items-center justify-between bg-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{
                backgroundColor: flight.airlineColor,
              }}
            >
              <Plane size={20} className="text-white" />
            </div>
            <div>
              <div className="text-white/70 text-xs">{flight.airline}</div>
              <div className="text-white text-sm">Flight {flight.callsign}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Flight Route */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="text-gray-400 text-xs mb-1">From</div>
              <div className="text-white text-xl">{flight.origin}</div>
            </div>
            <div className="flex-shrink-0 mx-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full p-1">
                  <Plane size={10} className="text-white" />
                </div>
              </div>
            </div>
            <div className="flex-1 text-right">
              <div className="text-gray-400 text-xs mb-1">To</div>
              <div className="text-white text-xl">{flight.destination}</div>
            </div>
          </div>

          {/* Flight Details Grid */}
          <div className="space-y-2">
            <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <MapPin size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Altitude</div>
                  <div className="text-white text-sm">{flight.altitude.toLocaleString()} ft</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <Gauge size={16} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Speed</div>
                  <div className="text-white text-sm">{flight.speed} knots</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Clock size={16} className="text-green-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Departure</div>
                  <div className="text-white text-sm">{flight.departureTime}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/20 p-2 rounded-lg">
                  <Clock size={16} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Arrival</div>
                  <div className="text-white text-sm">{flight.arrivalTime}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Plane size={16} className="text-orange-400" />
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Aircraft</div>
                  <div className="text-white text-sm">{flight.aircraft}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}