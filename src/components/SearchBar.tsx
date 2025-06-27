import { useState } from 'react';
import '../style-modules/search-module.css'


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
      <div className="containerSearchbar">
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Buscar receta..."
        className="form-control"
      />
      <button type="submit" className="">
        Buscar
      </button>
      </div>
    </form>
  );
}
 export default SearchBar;