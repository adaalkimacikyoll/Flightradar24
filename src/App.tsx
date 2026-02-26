import { useState } from "react";
import { FlightMap } from "./components/FlightMap";
import { SearchBar } from "./components/SearchBar";
import { BottomToolbar } from "./components/BottomToolbar";
import { SettingsPage } from "./components/SettingsPage";
import {
  WeatherPage,
  WeatherLayers,
} from "./components/WeatherPage";
import { FiltersPage } from "./components/FiltersPage";
import { AlertsPage } from "./components/AlertsPage";
import { PlaybackPage } from "./components/PlaybackPage";
import { WeatherAlertToggle } from "./components/WeatherAlertToggle";
import { Menu, Navigation, Plus, Minus } from "lucide-react";
import { ConfirmationToast } from "./components/ConfirmationToast";

export default function App() {
  const [activeTab, setActiveTab] = useState("maps");
  const [zoomLevel, setZoomLevel] = useState(4);
  const [confirmationMessage, setConfirmationMessage] =
    useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherLayers, setWeatherLayers] =
    useState<WeatherLayers>({
      volcanicEruption: false,
      cloud: false,
      precipitation: false,
    });

  // Weather alerts only show when Volcanic Eruption layer is active
  const weatherAlertIndex = weatherLayers.volcanicEruption
    ? 1
    : 0;

  const showConfirmation = (message: string) => {
    setConfirmationMessage(message);
    setTimeout(() => setConfirmationMessage(""), 2500);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 30) {
      setZoomLevel((prev) => prev + 1);
      showConfirmation("Zoomed In");
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel((prev) => prev - 1);
      showConfirmation("Zoomed Out");
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-11 bg-gradient-to-b from-black/40 to-transparent flex items-center justify-between px-4 text-white z-50">
        <div className="flex items-center gap-2">
          <span>18:16</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-2.5 bg-white/60 rounded-sm"></div>
            <div className="w-1 h-3 bg-white/80 rounded-sm"></div>
            <div className="w-1 h-3.5 bg-white rounded-sm"></div>
            <div className="w-1 h-4 bg-white rounded-sm"></div>
          </div>
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="white"
            className="ml-2"
          >
            <path d="M16 0H2C0.9 0 0 0.9 0 2V10C0 11.1 0.9 12 2 12H16C17.1 12 18 11.1 18 10V2C18 0.9 17.1 0 16 0ZM16 10H2V2H16V10Z" />
            <rect
              x="14"
              y="3"
              width="2"
              height="6"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Main Content - Maps View */}
      {activeTab === "maps" && (
        <>
          {/* Search Bar */}
          <SearchBar onSearch={setSearchQuery} />

          {/* Flight Map */}
          <FlightMap
            zoomLevel={zoomLevel}
            weatherAlertIndex={weatherAlertIndex}
            weatherLayers={weatherLayers}
            searchQuery={searchQuery}
          />

          {/* Navigation Button - Bottom Left */}
          <button
            onClick={() =>
              alert("Navigate to current location")
            }
            className="absolute left-5 bottom-36 z-40 w-14 h-14 bg-[#4a7c8f] rounded-full shadow-lg flex items-center justify-center hover:bg-[#5a8c9f] transition-colors active:scale-95"
          >
            <Navigation
              size={24}
              className="text-white"
              fill="white"
            />
          </button>

          {/* Zoom In Button */}
          <button
            onClick={handleZoomIn}
            className="absolute right-5 bottom-36 z-40 w-14 h-14 bg-[#6b6b6b] rounded-full shadow-lg flex items-center justify-center hover:bg-[#7b7b7b] transition-colors active:scale-95"
          >
            <Plus size={24} className="text-white" />
          </button>

          {/* Zoom Out Button */}
          <button
            onClick={handleZoomOut}
            className="absolute right-5 bottom-56 z-40 w-14 h-14 bg-[#6b6b6b] rounded-full shadow-lg flex items-center justify-center hover:bg-[#7b7b7b] transition-colors active:scale-95"
          >
            <Minus size={24} className="text-white" />
          </button>
        </>
      )}

      {/* Other Pages */}
      {activeTab === "settings" && (
        <SettingsPage onBack={() => setActiveTab("maps")} />
      )}
      {activeTab === "weather" && (
        <WeatherPage
          onBack={() => setActiveTab("maps")}
          onWeatherLayerChange={setWeatherLayers}
          initialLayers={weatherLayers}
        />
      )}
      {activeTab === "filters" && (
        <FiltersPage
          onBack={() => setActiveTab("maps")}
          showConfirmation={showConfirmation}
        />
      )}
      {activeTab === "alerts" && (
        <AlertsPage onBack={() => setActiveTab("maps")} />
      )}
      {activeTab === "playback" && (
        <PlaybackPage onBack={() => setActiveTab("maps")} />
      )}

      {/* Confirmation Toast */}
      {confirmationMessage && (
        <ConfirmationToast message={confirmationMessage} />
      )}

      {/* Bottom Toolbar */}
      <BottomToolbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showConfirmation={showConfirmation}
      />
    </div>
  );
}