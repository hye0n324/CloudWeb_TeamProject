interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function FilterBar({ options, selectedValue, onSelect }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {options.map((option) => {
        const isActive = selectedValue === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              isActive
                ? 'bg-neon-500 text-black border-neon-500 shadow-lg shadow-neon-500/20'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
