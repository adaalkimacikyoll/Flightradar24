import { CheckCircle2 } from 'lucide-react';

interface ConfirmationToastProps {
  message: string;
}

export function ConfirmationToast({ message }: ConfirmationToastProps) {
  return (
    <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-gray-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
        <CheckCircle2 size={20} className="text-[#4ade80]" strokeWidth={2.5} />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
