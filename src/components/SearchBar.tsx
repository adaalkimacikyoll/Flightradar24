import { Search, ScanLine, User } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim().toUpperCase());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="absolute top-14 left-0 right-0 px-4 z-40">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* AR Button - Secondary Tool */}
        <button 
          type="button"
          onClick={() => alert('AR Mode activated')}
          className="w-14 h-14 bg-[#2a2a2a] backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-[#333333] transition-colors shrink-0 active:scale-95 shadow-lg"
        >
          <span className="text-xl">AR</span>
        </button>

        {/* Search Bar - Primary Function (Emphasized) */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Search size={24} className={isFocused ? "text-blue-500" : "text-gray-500"} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyPress={handleKeyPress}
            placeholder="Enter flight code or PNR"
            className="w-full h-14 pl-12 pr-4 bg-white rounded-xl shadow-md text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </form>
    </div>
  );
}