import { ArrowLeft, Bell, AlertTriangle, Info } from 'lucide-react';

interface AlertsPageProps {
  onBack: () => void;
}

export function AlertsPage({ onBack }: AlertsPageProps) {
  const alerts = [
    { 
      id: 1, 
      type: 'warning', 
      title: 'Turbulence Alert', 
      message: 'Moderate turbulence reported over Atlantic',
      time: '10 min ago',
      icon: AlertTriangle,
      color: 'text-orange-400'
    },
    { 
      id: 2, 
      type: 'info', 
      title: 'Delay Notice', 
      message: 'BA142 delayed by 30 minutes at LHR',
      time: '25 min ago',
      icon: Info,
      color: 'text-blue-400'
    },
    { 
      id: 3, 
      type: 'info', 
      title: 'Weather Update', 
      message: 'Clear skies expected in Europe region',
      time: '1 hour ago',
      icon: Info,
      color: 'text-blue-400'
    },
  ];

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-40 overflow-y-auto">
      {/* Header */}
      <div className="bg-gray-900/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-10">
        <div className="px-4 pt-14 pb-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white text-2xl">Alerts</h1>
        </div>
      </div>

      {/* Alerts List */}
      <div className="p-4 space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 transition-colors"
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 ${alert.color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-white">{alert.title}</h3>
                    <span className="text-white/50 text-xs">{alert.time}</span>
                  </div>
                  <p className="text-white/70 text-sm">{alert.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}