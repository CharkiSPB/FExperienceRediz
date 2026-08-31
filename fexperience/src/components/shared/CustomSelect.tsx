'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
};

export function CustomSelect({ options, value, onChange, placeholder, error }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-[#1A1A1A]/80 border ${error ? 'border-red-500' : 'border-[#2A2A2A]'} rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF8800] transition-colors cursor-pointer ${selectedOption ? 'text-white' : 'text-[#666666]'}`}
      >
        <span>{selectedOption ? selectedOption.label : placeholder || 'Выберите...'}</span>
        <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden shadow-xl">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#2A2A2A';
              }}
              onMouseLeave={(e) => {
                if (option.value !== value) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#1A1A1A';
                }
              }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer ${
                option.value === value
                  ? 'text-[#FF8800] bg-[#2A2A2A]'
                  : 'text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}
