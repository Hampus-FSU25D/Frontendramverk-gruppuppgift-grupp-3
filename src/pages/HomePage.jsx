// This is a test for tags and search with visible results
import { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import Tags from "../components/ui/Tags";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // Test recipes with tags
  const testRecipes = [
    { id: 1, title: "Chokladkaka", tags: ["Choklad", "Snabbt"] },
    { id: 2, title: "Glass med bär", tags: ["Glass", "Sommrig"] },
    { id: 3, title: "Glutenfri kladdkaka", tags: ["Choklad", "Glutenfri"] },
    { id: 4, title: "Vaniljglass", tags: ["Glass", "Enkelt"] },
    { id: 5, title: "Morotskaka", tags: ["Klassisk", "Muffins"] },
  ];

  // Filter recipes based on search and tag
  const filteredRecipes = testRecipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || recipe.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Get all unique tags from test recipes
  const allTags = [...new Set(testRecipes.flatMap((r) => r.tags))];

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🍰 Receptbank (TESTPAGE)</h1>

      <SearchBar
        onSearch={setSearchTerm}
        onFilter={setSelectedTag}
        availableTags={allTags}
      />

      {/* Show active filters */}
      {(searchTerm || selectedTag) && (
        <div
          style={{
            margin: "1rem 0",
            padding: "0.5rem",
            background: "#FEFD99",
            borderRadius: "8px",
          }}
        >
          <strong>Aktiva filter:</strong>
          {searchTerm && <span> 🏷️ Sök: "{searchTerm}"</span>}
          {selectedTag && <span> 🏷️ Tag: {selectedTag}</span>}
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedTag("");
            }}
            style={{
              marginLeft: "1rem",
              background: "#CA6180",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Rensa filter
          </button>
        </div>
      )}

      {/* Results count */}
      <h3>Resultat: {filteredRecipes.length} recept</h3>

      {/* Display filtered recipes */}
      {filteredRecipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: "2px solid #9ED3DC",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "12px",
            background: "white",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0" }}>{recipe.title}</h4>
          <Tags tags={recipe.tags} />
        </div>
      ))}

      {/* Show if no results */}
      {filteredRecipes.length === 0 && (
        <p style={{ color: "#CA6180", textAlign: "center", padding: "2rem" }}>
          😕 Inga recept hittades. Prova andra sökord!
        </p>
      )}
    </div>
  );
};

export default HomePage;
