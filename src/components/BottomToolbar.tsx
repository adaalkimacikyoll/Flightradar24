import { Map, Settings, Cloud, Filter, Bell, History } from 'lucide-react';

interface BottomToolbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showConfirmation: (message: string) => void;
}

export function BottomToolbar({ activeTab, setActiveTab, showConfirmation }: BottomToolbarProps) {
  const tabs = [
    { id: 'maps', label: 'Maps', icon: Map, confirmMsg: 'Map view active' },
    { id: 'settings', label: 'Settings', icon: Settings, confirmMsg: 'Settings opened' },
    { id: 'weather', label: 'Weather', icon: Cloud, confirmMsg: 'Weather layer enabled' },
    { id: 'filters', label: 'Filters', icon: Filter, confirmMsg: 'Filters updated' },
    { id: 'alerts', label: 'Alerts', icon: Bell, confirmMsg: 'Alerts configured' },
    { id: 'playback', label: 'Playback', icon: History, confirmMsg: 'Playback mode on' },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.id);
    showConfirmation(tab.confirmMsg);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 pb-6 px-3 z-50">
      <div className="bg-[#2a2a2a] rounded-[32px] px-2 py-4 shadow-2xl">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl transition-all ${
                  isActive 
                    ? 'bg-white/20 shadow-lg' 
                    : 'hover:bg-white/5 active:bg-white/10'
                }`}
              >
                <div className="relative">
                  <Icon 
                    size={32} 
                    className={`transition-all ${
                      isActive 
                        ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
                        : 'text-white/70'
                    }`}
                    strokeWidth={isActive ? 3 : 2}
                  />
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#4ade80] rounded-full shadow-lg shadow-green-500/50"></div>
                  )}
                </div>
                <span 
                  className={`text-[11px] transition-all ${
                    isActive 
                      ? 'text-white' 
                      : 'text-white/60'
                  }`}
                  style={{
                    fontWeight: isActive ? '600' : '400',
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* iPhone Home Indicator */}
      <div className="flex justify-center mt-2">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}