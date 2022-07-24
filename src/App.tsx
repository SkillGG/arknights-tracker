import { useEffect, useState } from "react";
import "./App.css";
import CharacterShow from "./CharacterShow";
import FilterPicker from "./FilterPicker";
import { ArkData, Filter, parseLocation } from "./utils";

import Chars from "./operators.json";
import PityTracker from "./PityTracker";
function App() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [characters] = useState<ArkData[]>(Chars);
  const [tag, setTag] = useState(true);

  const [page, setPage] = useState<"recruit" | "pity">("recruit");

  const [firstLoad, setFirstLoad] = useState(false);

  const refreshHistory = () => {
    history.pushState("", "", `?filter=${filters.map((f) => f.id).join(",")}`);
  };

  const isSelected = (s: string) => {
    return !!filters.find((f) => f.id === s);
  };
  const tooMuch = (f: Filter[]) => f.length >= 5;
  const select = (s: string) => {
    if (isSelected(s)) {
      setFilters((p) => p.filter((f) => f.id !== s));
    } else {
      setFilters((p) =>
        tooMuch(filters)
          ? p
          : [...p, { filter: (d) => d.tags.includes(s), id: s }]
      );
    }
  };
  const selectMany = (sarr: string[]) => {
    let len = filters.length;
    sarr.forEach((s) => {
      if (len >= 5) return;
      if (isSelected(s)) {
        setFilters((p) => p.filter((f) => f.id !== s));
      } else {
        setFilters((p) =>
          tooMuch(filters)
            ? p
            : [...p, { filter: (d) => d.tags.includes(s), id: s }]
        );
      }
      len++;
    });
  };

  useEffect(() => {
    console.log("Reading from href");
    const locationData = parseLocation();
    setPage(locationData.path);
    if (locationData.path === "recruit") {
      selectMany(locationData.filters);
    }
    setFirstLoad(true);
  }, []);

  useEffect(() => {
    if (firstLoad || filters.length > 0) {
      refreshHistory();
    }
  }, [filters]);

  return (
    <>
      {page === "recruit" ? (
        <>
          <FilterPicker
            select={select}
            isSelected={isSelected}
            unselectAll={() => setFilters([])}
            tag={tag}
            setTag={setTag}
          />
          <CharacterShow
            characters={characters}
            filters={filters}
            showTag={tag}
          />
        </>
      ) : (
        <PityTracker />
      )}
    </>
  );
}

export default App;
