import { ArrowLeft, User, Bell, Globe, Shield, Info } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const settingsItems = [
    { icon: User, label: 'Account', description: 'Manage your profile' },
    { icon: Bell, label: 'Notifications', description: 'Push notification settings' },
    { icon: Globe, label: 'Language', description: 'English' },
    { icon: Shield, label: 'Privacy', description: 'Data and permissions' },
    { icon: Info, label: 'About', description: 'Version 2.4.1' },
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
          <h1 className="text-white text-2xl">Settings</h1>
        </div>
      </div>

      {/* Settings List */}
      <div className="p-4 space-y-2">
        {settingsItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="w-full bg-white/5 hover:bg-white/10 rounded-2xl p-4 flex items-center gap-4 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Icon size={24} className="text-blue-400" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-white">{item.label}</div>
                <div className="text-white/50 text-sm">{item.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}