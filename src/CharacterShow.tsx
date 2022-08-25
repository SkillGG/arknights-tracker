import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ArkData,
  Filter,
  calculateRecruitmentCharacters,
  Settings,
} from "./utils";

interface CharacterShowProps {
  characters: ArkData[];
  filters: Filter[];
  showTag: boolean;
  selectRecruitment(tags: string[], picked: string[], selected?: ArkData): void;
  settings: Settings;
}

import "./characters.css";
import Character from "./Character";

const CharacterShow: FunctionComponent<CharacterShowProps> = ({
  characters,
  filters,
  showTag,
  selectRecruitment,
  settings,
}) => {
  const sc = calculateRecruitmentCharacters(characters, filters);
  sc.forEach((f) =>
    f.ids.sort((p, n) => characters[n].stars - characters[p].stars)
  );
  const getItem = (c: ArkData, s: string) => {
    return (
      <div
        onClick={() => {
          if (!settings.saveHistory) return;
          if (settings.clickToSelectOutcome) {
            selectRecruitment(
              filters.map((f) => f.id),
              s.split(",").map((r) => r.trim()),
              c
            );
          }
        }}
        key={`${c.name}_${s}`}
      >
        <Character
          image={c.image}
          name={c.name}
          stars={c.stars}
          tags={c.tags}
          settings={settings}
          showTag={showTag}
          hoveredStyle={
            settings.saveHistory && settings.clickToSelectOutcome
              ? { backgroundColor: "green" }
              : {}
          }
        />
      </div>
    );
  };
  const [cols, setCols] = useState(Math.trunc(window.innerWidth / 400));
  window.onresize = () => {
    setCols(
      window.innerWidth <= 1500
        ? Math.trunc(window.innerWidth / 300)
        : Math.trunc(window.innerWidth / 400)
    );
  };

  const isCharacter = (e: Element) => {
    let cL = e.classList;
    let tempE = e;
    console.log(cL.length);
    while (cL.length == 0) {
      if (!tempE.parentElement) return false;
      cL = tempE.parentElement.classList;
      tempE = tempE.parentElement;
    }
    return cL.contains("character");
  };

  return (
    <>
      {sc.map((s) => {
        return (
          <React.Fragment key={s.group}>
            <div
              className={`category${settings.saveHistory ? " canSave" : ""}`}
              onClick={(e) => {
                if (!settings.saveHistory) return;
                const target = e.target as Element;
                if (isCharacter(target)) {
                  if (!settings.characterDatabase)
                    if (!settings.clickToSelectOutcome)
                      selectRecruitment(
                        filters.map((f) => f.id),
                        s.group.split(",").map((r) => r.trim())
                      );
                } else {
                  selectRecruitment(
                    filters.map((f) => f.id),
                    s.group.split(",").map((r) => r.trim())
                  );
                }
              }}
            >
              <div
                className="groupname"
                data-good={s.ids.reduce<number>(
                  (p, n) => (characters[n].stars < p ? characters[n].stars : p),
                  6
                )}
              >
                {s.group}
              </div>
              <div
                className="characters"
                style={{
                  gridTemplateColumns: `1fr `.repeat(
                    s.ids.length > cols ? cols : s.ids.length
                  ),
                }}
              >
                {s.ids.map((c) => getItem(characters[c], s.group))}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CharacterShow;
