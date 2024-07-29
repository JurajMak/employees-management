import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../Input';

interface OwnProps {
  onChange: (searchQuery: string) => void;
  initialValue: string;
  className?: string;
}

const SearchBar: React.FC<OwnProps> = ({ onChange, initialValue = '', className = 'max-w-[20dvw]' }) => {
  const [inputValue, setInputValue] = React.useState(initialValue);

  React.useEffect(() => {
    if (inputValue.length === 0) {
      onChange(inputValue);
    }
  }, [inputValue]);

  return (
    <div className="relative w-full">
      <Input
        className={`min-w-[300px] xl:max-w-[20dvw] pl-12 ${className}`}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange(inputValue);
          }
        }}
        onBlur={() => onChange(inputValue)}
        placeholder="Search employees..."
      />
      <Search size={25} className="absolute top-1.5 left-2" color="#E2E8F0" />
    </div>
  );
};

export default SearchBar;
