import { useMedicines } from "../context/MedicineContext";

import "./SearchBar.css";

function SearchBar() {

  const {
    searchTerm,
    setSearchTerm,
  } = useMedicines();

  return (

    <div className="search-bar-container">

      <span className="search-icon">
        🔍
      </span>

      <input
        type="text"
        className="search-input"
        placeholder="Search medicine..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

    </div>

  );

}

export default SearchBar;