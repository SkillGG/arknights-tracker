import { useEffect, useState } from "react";
import "./App.css";
import CharacterShow from "./CharacterShow";
import FilterPicker from "./FilterPicker";
import PityTracker from "./PityTracker";
import {
  ArkData,
  checkIfIsASetting,
  DEFAULT_SETTINGS,
  Filter,
  FullRecruitmentTags,
  PageType,
  parseLocation,
  PastRecruitment,
  Settings,
} from "./utils";

import Chars from "./operators.json";
import NavBar from "./NavBar";
import StorageIDS from "./localStorageIDs.json";
import RecruitmentHistory from "./RecruitmentHistory";

function App() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [characters] = useState<ArkData[]>(Chars);
  const [tag, setTag] = useState(true);

  const [page, setPage] = useState<PageType>("recruit");

  const [firstLoad, setFirstLoad] = useState(false);

  const [settings, setSettings] = useState<Settings>(
    JSON.parse(localStorage.getItem(StorageIDS.settings) || DEFAULT_SETTINGS)
  );

  const [recHistory, setRecHistory] = useState<PastRecruitment[]>(
    JSON.parse(
      localStorage.getItem(StorageIDS.recruitment.history) || "[]"
    ).filter((z: any) => z)
  );

  const changeSetting = (setting: string, value: any) => {
    if (checkIfIsASetting(setting)) settings[setting] = value;
    localStorage.setItem(StorageIDS.settings, JSON.stringify(settings));
    setSettings(Object.assign({}, settings));
  };

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

  window.onpopstate = () => {
    window.location.href = window.location.href;
  };

  const moveToPage = (page: PageType) => {
    history.pushState(null, "", page);
    setPage(page);
  };

  const addToRecHistory = (
    ids: FullRecruitmentTags,
    picked: string[],
    selected?: ArkData
  ) => {
    recHistory.push({
      tags: ids,
      date: new Date().getTime(),
      outcome: selected ? selected.name : undefined,
      picked,
    });
    localStorage.setItem(
      StorageIDS.recruitment.history,
      JSON.stringify(recHistory)
    );
    setRecHistory((p) => Object.assign([], recHistory));
  };

  return (
    <>
      <title>
        {page === "recruit"
          ? "Recruitment Arknights"
          : page === "pity"
          ? "Pity Tracker Arknights"
          : "Recruitment History Arknights"}
      </title>
      <NavBar
        page={page}
        moveToPage={moveToPage}
        changeSetting={changeSetting}
        settings={settings}
      />
      {page === "recruit" ? (
        <>
          <FilterPicker
            select={select}
            isSelected={isSelected}
            unselectAll={() => setFilters([])}
            tag={tag}
            setTag={setTag}
            settings={settings}
          />
          <CharacterShow
            characters={characters}
            filters={filters}
            showTag={tag}
            selectRecruitment={(
              s: string[],
              p: string[],
              selected?: ArkData
            ) => {
              addToRecHistory(s, p, selected);
              setFilters([]);
            }}
            settings={settings}
          />
        </>
      ) : page === "pity" ? (
        <PityTracker settings={settings} />
      ) : (
        <>
          <RecruitmentHistory
            settings={settings}
            characters={characters}
            recHistory={recHistory}
            toggleStrikeOut={(d, t) => {
              const index = recHistory.findIndex((r) => r.date === d);
              if (index > 0) {
                const tagIndex = recHistory[index].picked.findIndex(
                  (tag) => tag === t
                );
                recHistory[index].picked[tagIndex] =
                  t.charAt(0) === "-" ? t.substring(1) : `-${t}`;
                setRecHistory(Object.assign([], recHistory));
              }
            }}
            setOutcome={(d, o) => {
              const i = recHistory.findIndex((r) => r.date === d);
              recHistory[i].outcome = o.name;
              localStorage.setItem(
                StorageIDS.recruitment.history,
                JSON.stringify(recHistory)
              );
              setRecHistory(Object.assign([], recHistory));
            }}
            removeFromHistory={(d) => {
              const i = recHistory.findIndex((r) => r.date === d);
              delete recHistory[i];
              localStorage.setItem(
                StorageIDS.recruitment.history,
                JSON.stringify(recHistory)
              );
              setRecHistory(Object.assign([], recHistory));
            }}
          />
        </>
      )}
    </>
  );
}

export default App;
