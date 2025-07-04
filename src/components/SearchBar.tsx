import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="🔍 Buscar recetas..."
        value={input}
        onChange={handleInputChange}
        className="search-input"
      />
      <button
        type="submit"
        className="cta-button primary"
        style={{ minWidth: 110 }}
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
