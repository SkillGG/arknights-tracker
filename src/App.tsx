import { useEffect, useState } from "react";
import "./App.css";
import CharacterShow from "./Recruitment/Picker/CharacterShow";
import FilterPicker from "./Recruitment/Picker/FilterPicker";
import PityTracker from "./Pity/PityTracker";
import {
  ArkData,
  checkIfIsASetting,
  DEFAULT_SETTINGS,
  Filter,
  FullRecruitmentTags,
  getFilters,
  PageType,
  parseLocation,
  PastRecruitment,
  Settings,
  toggleTag,
} from "./utils";

import Chars from "./operators.json";
import NavBar from "./NavBar";
import StorageIDS from "./localStorageIDs.json";
import RecruitmentHistory from "./Recruitment/History/RecruitmentHistory";
import {
  HistoryUpdate,
  isFullHistoryUpdate,
  RecHis,
} from "./Recruitment/History/rechis.util";

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
    RecHis.decompress(
      localStorage.getItem(StorageIDS.recruitment.history) || "[]"
    ).filter((z: any) => z)
  );

  const changeSetting = (setting: string, value: any) => {
    if (checkIfIsASetting(setting)) settings[setting] = value;
    localStorage.setItem(StorageIDS.settings, JSON.stringify(settings));
    setSettings(Object.assign({}, settings));
  };

  const refreshURLHistory = () => {
    history.pushState(
      "",
      "",
      `?filter=${filters
        .filter((f) => f.id)
        .map((f) => f.id)
        .join(",")}`
    );
  };

  const isSelected = (s: string) => {
    return !!filters.find((f) => f.id === s);
  };
  const tooMany = (s: string[]) => s.length > 5;
  const select = (s: string) => {
    const curr = toggleTag(
      filters.map((f) => f.id),
      s
    ).filter((t) => !!t);
    if (tooMany(curr)) return;
    setFilters(getFilters(curr));
  };
  const selectMany = (sarr: string[]) => {
    const checked = sarr.slice(0, 5);
    setFilters(getFilters(checked));
  };

  useEffect(() => {
    const locationData = parseLocation();
    setPage(locationData.path);
    if (locationData.path === "recruit") {
      selectMany(locationData.filters);
    }
    setFirstLoad(true);
  }, []);

  window.onpopstate = () => {
    const locationData = parseLocation();
    setPage(locationData.path);
    if (locationData.path === "recruit") {
      selectMany(locationData.filters);
    }
  };

  useEffect(() => {
    if (firstLoad || filters.length > 0) {
      refreshURLHistory();
    }
  }, [filters]);

  const moveToPage = (page: PageType) => {
    history.pushState(null, "", page);
    setPage(page);
  };

  const addToRecHistory = (
    ids: FullRecruitmentTags,
    picked: string[],
    selected?: ArkData
  ) => {
    saveHistoryChangeToLS({
      f: (rh: PastRecruitment[]) => {
        rh.push({
          tags: ids.filter((f) => !!f),
          date: new Date().getTime(),
          outcome: selected ? selected.name : undefined,
          picked,
        });
        return rh;
      },
    });
  };

  const tagsRefreshed = () => {
    addToRecHistory(
      filters.map((r) => r.id),
      []
    );
    setFilters([]);
  };

  const saveHistoryChangeToLS = (o: HistoryUpdate) => {
    const useCompression = (sh: PastRecruitment[]) => {
      const JSONstr = JSON.stringify(sh);
      // console.log(JSONstr);
      const RECHstr = RecHis.compress(sh);
      return RECHstr;
    };
    let srh = [...recHistory];
    if (!isFullHistoryUpdate(o)) {
      const index = recHistory.findIndex((rh) => rh.date === o.d);
      if (index !== -1) {
        srh[index] = o.f(srh[index]);
      }
    } else if (isFullHistoryUpdate(o)) {
      srh = o.f(srh);
    }
    localStorage.setItem(StorageIDS.recruitment.history, useCompression(srh));
    setRecHistory(srh);
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
            tagsRefreshed={tagsRefreshed}
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
              saveHistoryChangeToLS({
                d,
                f: (rh: PastRecruitment) => {
                  const tagIndex = rh.picked.findIndex((tag) => tag === t);
                  rh.picked[tagIndex] =
                    t.charAt(0) === "-" ? t.substring(1) : `-${t}`;
                  return rh;
                },
              });
            }}
            setOutcome={(d, o) => {
              saveHistoryChangeToLS({
                d,
                f: (rh: PastRecruitment) => {
                  rh.outcome = o.name;
                  return rh;
                },
              });
            }}
            removeFromHistory={(d) => {
              saveHistoryChangeToLS({
                d,
                f: (rh: PastRecruitment) => {
                  rh = { date: 0, picked: [], tags: [] };
                  return rh;
                },
              });
            }}
          />
        </>
      )}
    </>
  );
}

export default App;
