import React, { FunctionComponent, useEffect, useState } from "react";
import { ArkData, Filter } from "./utils";

interface CharacterShowProps {
  characters: ArkData[];
  filters: Filter[];
  showTag: boolean;
}

import "./characters.css";

const CharacterShow: FunctionComponent<CharacterShowProps> = ({
  characters,
  filters,
  showTag,
}) => {
  const hits = characters.reduce<string[][]>((p, n) => {
    return [
      ...p,
      filters.reduce<string[]>((p, f) => (f.filter(n) ? [...p, f.id] : p), []),
    ];
  }, []);
  const chars = hits
    .map<[string[], number]>((h, i) => [h, i])
    .filter((h) => h[0].length > 0);
  chars.sort((p, n) => n[0].length - p[0].length);
  const sc: { group: string; ids: number[] }[] = [];
  chars.forEach((c) => {
    const addToGroup = (g: string, id: number) => {
      const gi = sc.findIndex((o) => o.group === g);
      if (gi === -1) sc.push({ group: g, ids: [id] });
      else sc[gi].ids.push(id);
    };
    const type = c[0].join(",");
    const id = c[1];
    if (characters[id].stars < 3) return;
    if (c[0].length > 3) return;
    if (characters[id].stars === 6 && !c[0].includes("Top Operator")) return;
    addToGroup(type, id);
    if (c[0].length === 3) {
      const g1 = c[0].slice(0, 2).join(",");
      const g2 = c[0].slice(1, 3).join(",");
      const g3 = [c[0][0], c[0][2]].join(",");
      addToGroup(g1, id);
      addToGroup(g2, id);
      addToGroup(g3, id);
    }
    if (c[0].length > 1) {
      c[0].forEach((g) => {
        const gi = sc.findIndex((o) => o.group === g);
        if (gi === -1) sc.push({ group: g, ids: [id] });
        else sc[gi].ids.push(id);
      });
    }
  });
  sc.sort((p, n) => p.ids.length - n.ids.length);
  sc.forEach((f) =>
    f.ids.sort((p, n) => characters[n].stars - characters[p].stars)
  );
  const getItem = (c: ArkData, s: string) => {
    return (
      <div className="character" data-good={c.stars} key={`${c.name}_${s}`}>
        <figure
          onClick={() =>
            window.open(
              `https://aceship.github.io/AN-EN-Tags/akhrchars.html?opname=${c.name}`,
              "_blank"
            )
          }
          title={`Check ${c.name}`}
        >
          <img src={c.image} width={100} height={100} />
          <figcaption>
            {c.name}
            <br />
            <b>{"⭐".repeat(c.stars)}</b>
            {showTag && (
              <>
                <br />
                <p>{c.tags.join(", ")}</p>
              </>
            )}
          </figcaption>
        </figure>
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
  return (
    <>
      {sc.map((s) => {
        return (
          <React.Fragment key={s.group}>
            <div className="category">
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
