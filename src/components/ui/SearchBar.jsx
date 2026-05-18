import { useState, useEffect } from "react";
import styles from "../../styles/SearchBar.module.css";

const SearchBar = ({ onSearch, onFilter, availableTags = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    onSearch?.(searchTerm);
  }, [searchTerm, onSearch]);

  useEffect(() => {
    onFilter?.(selectedTag);
  }, [selectedTag, onFilter]);

  const handleClear = () => {
    setSearchTerm("");
    setSelectedTag("");
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          placeholder="Sök efter recept..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={styles.filterToggleBtn}
        >
          🔍
        </button>
        {searchTerm && (
          <button onClick={handleClear} className={styles.clearBtn}>
            ✕
          </button>
        )}
      </div>

      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Filtrera på tag:</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={styles.tagSelect}
            >
              <option value="">Alla recept</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
