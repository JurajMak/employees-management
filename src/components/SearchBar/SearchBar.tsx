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
    <Input
      className={`max-w-[20dvw] ${className}`}
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
  );
};

export default SearchBar;
