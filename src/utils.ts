export type ArkData = {
  tags: string[];
  name: string;
  stars: number;
  image: string;
};

export type PageType = "recruit" | "pity" | "recHis";

export type Settings = {
  saveHistory: boolean;
  sendHistoryToDB: boolean;
  characterDatabase: boolean;
  clickToSelectOutcome: boolean;
};

const DEF_SETTINGS: Settings = {
  saveHistory: true,
  sendHistoryToDB: false,
  characterDatabase: false,
  clickToSelectOutcome: false,
};
export const checkIfIsASetting = (set: string): set is keyof Settings =>
  Object.keys(DEF_SETTINGS).includes(set);
export const DEFAULT_SETTINGS = JSON.stringify(DEF_SETTINGS);

export type Filter = {
  filter(d: ArkData): boolean;
  id: string;
};

export type PastRecruitment = {
  date: number;
  tags: string[];
  picked: string[];
  outcome?: string;
  chosen?: string[];
};

export type FullRecruitmentTags = PastRecruitment["tags"];

export type LinkData =
  | {
      path: "recruit";
      filters: string[];
    }
  | { path: "pity" }
  | { path: "recHis" };

export const parseLocation = (): LinkData => {
  const path = location.pathname.replace(/\//g, "");
  if (path === "pity") return { path: "pity" };
  if (path === "recHis") return { path: "recHis" };
  else if (path === "recruit") {
    const filterSearch = /filter=([^&]*)/.exec(location.search)?.[1];
    const filters: string[] = [];
    if (filterSearch) filters.push(...filterSearch.split(","));
    return { path: "recruit", filters };
  } else return { path: "recruit", filters: [] };
};

export const getFilters = (tags: string[]): Filter[] => {
  const canBeTop = tags.includes("Top Operator");
  return [
    ...tags
      .map((t) => ({
        filter: (d: ArkData) => {
          return d.tags.includes(t);
        },
        id: t,
      }))
      .filter((f) => f.id.charAt(0) !== "-"),
    { filter: (d: ArkData) => +canBeTop - +(d.stars === 6) === 0, id: "" },
  ];
};

export const getCharactersForFilters = (
  characters: ArkData[],
  filters: Filter[]
) => {
  return characters.filter((char) => {
    for (let i = 0; i < filters.length; i++) {
      if (!filters[i].filter(char)) return false;
    }
    return true;
  });
};

export const calculateRecruitmentCharacters = (
  characters: ArkData[],
  filters: Filter[]
) => {
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
  return sc;
};
