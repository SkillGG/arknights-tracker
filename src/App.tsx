import { useEffect, useState } from "react";
import "./App.css";
import CharacterShow from "./CharacterShow";
import FilterPicker from "./FilterPicker";
import { ArkData, Filter } from "./utils";

import Chars from "./operators.json";
function App() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [characters] = useState<ArkData[]>(Chars);
  const [tag, setTag] = useState(true);
  return (
    <>
      <FilterPicker
        filter={filters}
        setFilter={setFilters}
        tag={tag}
        setTag={setTag}
      />
      <CharacterShow characters={characters} filters={filters} showTag={tag} />
    </>
  );
}

export default App;
