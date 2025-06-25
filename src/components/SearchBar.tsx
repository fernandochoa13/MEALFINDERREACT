import { useState } from 'react';

type Props = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Buscar receta..."
        className=""
      />
      <button type="submit" className="">
        Buscar
      </button>
    </form>
  );
}
 export default SearchBar;