import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="my-4 text-center">
      <Input
        type="text"
        placeholder="Search bookmarks..."
        value={searchQuery}
        onChange={handleSearch}
        className="max-w-sm mx-auto text-center"
      />
    </div>
  );
}