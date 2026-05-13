# Dessertboken

## Projektbeskrivning

**Dessertboken** är ett React-projekt som utvecklas av **Grupp 3**. Appen är en receptbok med fokus på efterrätter där användare kan skapa och dela egna recept.

Målet är att bygga en enkel och tydlig webbapp där:

- alla besökare kan titta på recept utan att vara inloggade
- inloggade användare kan lägga till egna recept
- inloggade användare kan favoritmarkera recept
- användare kan ta bort sina egna recept

### Sidor

- **Startsida**: visar slumpade receptkort
- **Receptlista**: visar alla recept
- **Receptdetaljer**: visar information om ett recept samt delete-knapp för egna recept
- **Favoriter**: visar användarens favoritmarkerade recept
- **Lägg till recept**: formulär för att skapa nytt recept

### Komponenter

- `Header` med logga eller namn samt logga in/logga ut-knapp
- `Navbar` med länkar längst ner
- `RecipeList`
- `SearchBar / Filter`
- `RecipeCard`
- `AddRecipeForm` för att lägga till och redigera recept
- `FavoriteButton`
- `Tags`

### Struktur och arkitektur

- `RecipeProvider` hanterar global data, till exempel recept och favoriter
- `BrowserRouter` hanterar navigation mellan sidor
- `Layout` innehåller `Header` och `Navbar`
- `Pages` innehåller bland annat `RecipesPage`, `RecipeDetailsPage` och `AddRecipePage`
- Shared components innehåller bland annat `RecipeList`, `RecipeCard` och `Tags`

### Wireframe / Mockup

[Öppna projektets wireframe i Stitch](https://stitch.withgoogle.com/projects/444867321747387746)

## Installation

Projektet körs lokalt med Node.js och npm.

### Kom igång

```bash
npm install
npm run dev
```

Därefter öppnar du den lokala adress som visas i terminalen, vanligtvis något i stil med:

```text
http://localhost:5173
```

### Övriga kommandon

```bash
npm run build
npm run preview
```

Instruktionerna ovan är en startversion och kan uppdateras senare om projektstrukturen, verktygen eller arbetsflödet ändras.

## Tech Stack

Följande tekniker används redan eller planeras att användas i projektet:

- `React`
- `Vite`
- `React Router`
- `JavaScript`
- `CSS Modules` eller annan scoped styling
- `Git`
- `GitHub`

## Gruppmedlemmar

- **Nahid Baninamrah**: ansvarar för `AddRecipe`, `SearchBar / Filter`, `AddRecipeForm` och `Tags`
- **Sandra Granholm Englund**: ansvarar för `RecipeDetails`, delete-knapp för egna recept, `Navbar` och `FavoriteButton`
- **Hanna Geifalk**: ansvarar för receptlista, favoritlista, `RecipeList` och `RecipeCard`
- **Hampus Andersson**: ansvarar för startsida, `Header`, router, auth, supabase, grundstruktur, pipeline och rulesets
