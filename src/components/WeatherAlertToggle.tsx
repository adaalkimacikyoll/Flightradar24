import { Cloud } from 'lucide-react';

interface WeatherAlertToggleProps {
  onCycle: () => void;
}

export function WeatherAlertToggle({ onCycle }: WeatherAlertToggleProps) {
  return (
    <button
      onClick={onCycle}
      className="absolute top-20 right-5 z-30 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95"
      title="Cycle weather alerts"
    >
      <Cloud size={20} className="text-gray-700" />
    </button>
  );
}
