import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ArkData,
  Filter,
  Settings,
  calculateRecruitmentCharactersv2,
} from "../../utils";

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
  const sc = calculateRecruitmentCharactersv2(characters, filters);
  // const sc = calculateRecruitmentCharacters(characters, filters);
  sc.forEach((f) => f.chars.sort((p, n) => n.stars - p.stars));
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
          <React.Fragment key={s.group.join(", ")}>
            <div
              tabIndex={
                settings.saveHistory
                  ? settings.clickToSelectOutcome || settings.characterDatabase
                    ? -1
                    : 0
                  : -1
              }
              className={`category${settings.saveHistory ? " canSave" : ""}`}
              onClick={(e) => {
                if (!settings.saveHistory) return;
                const target = e.target as Element;
                if (isCharacter(target)) {
                  if (!settings.characterDatabase)
                    if (!settings.clickToSelectOutcome)
                      selectRecruitment(
                        filters.map((f) => f.id),
                        s.group.map((r) => r.trim())
                      );
                } else {
                  selectRecruitment(
                    filters.map((f) => f.id),
                    s.group.map((r) => r.trim())
                  );
                }
              }}
            >
              <div
                className="groupname"
                data-good={s.chars.reduce<number>(
                  (p, n) => (n.stars < p ? n.stars : p),
                  6
                )}
              >
                {s.group.join(", ")}
              </div>
              <div
                className="characters"
                style={{
                  gridTemplateColumns: `1fr `.repeat(
                    s.chars.length > cols ? cols : s.chars.length
                  ),
                }}
              >
                {s.chars.map((c) => getItem(c, s.group.join(", ")))}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CharacterShow;
