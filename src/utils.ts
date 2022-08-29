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

export const toggleTag = (tags: string[], tag: string): string[] => {
  if (tags.includes(tag)) return tags.filter((t) => t !== tag);
  else return [...tags, tag];
};

export const getFilters = (tags: string[], time: number = 9): Filter[] => {
  const canBeTop = tags.includes("Top Operator");
  const canBeSenior = tags.includes("Senior Operator");
  const canBe1Star = time < 4;
  const canBe2Star = time < 8;
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
    { filter: (d: ArkData) => +canBe1Star - +(d.stars === 1) === 0, id: "" },
    { filter: (d: ArkData) => +canBe2Star - +(d.stars === 2) === 0, id: "" },
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

export type RecruitmentGroup = { group: string[]; chars: Set<ArkData> };
export type LazyRecGroup = { group: string[]; chars: ArkData[] };

const symmetricArrayDiff = <T>(arr1: T[], arr2: T[]): T[] =>
  arr1
    .filter((x) => !arr2.includes(x))
    .concat(arr2.filter((x) => !arr1.includes(x)));

export const calculateRecruitmentCharactersv2 = (
  characters: ArkData[],
  filters: Filter[]
): LazyRecGroup[] => {
  if (filters.length === 0) return [];
  const lfh = filters.filter((f) => !f.id);
  const regf = filters.filter((f) => f.id);
  console.log(regf, lfh, filters);
  const chars =
    lfh.length > 0
      ? characters.filter((c) =>
          lfh.reduce<boolean>((p, n) => p && n.filter(c), true)
        )
      : characters;
  const groups: RecruitmentGroup[] = [];
  const addCharToGroup = (group: string[], char: ArkData) => {
    const gg = groups.find(
      (g) => symmetricArrayDiff<string>(group, g.group).length === 0
    );
    console.log("adding to ", char.name, group, gg);
    if (!gg) {
      groups.push({ chars: new Set([char]), group });
    } else {
      gg.chars.add(char);
    }
  };
  chars.forEach((char) => {
    const matchingTags = regf.filter((f) => f.filter(char)).map((f) => f.id);
    if (matchingTags.length === 0) return;
    // console.log(char.name, matchingTags);
    matchingTags.forEach((m) => {
      addCharToGroup([m], char);
      matchingTags
        .filter((t) => t !== m)
        .forEach((m2) => {
          addCharToGroup([m, m2], char);
          matchingTags
            .filter((mt) => mt !== m2 && mt !== m)
            .forEach((m3) => {
              addCharToGroup([m, m2, m3], char);
            });
        });
    });
  });
  groups.sort((a, b) => [...a.chars].length - [...b.chars].length);
  console.log(groups);
  return groups.map((g) => ({ ...g, chars: [...g.chars] }));
};

export const calculateRecruitmentCharacters = (
  characters: ArkData[],
  filters: Filter[]
) => {
  const hits = characters.reduce<string[][]>((p, n) => {
    return [
      ...p,
      filters.reduce<string[]>((p, f) => {
        // console.log(f.filter(n), n, f.id);
        if (f.id.length === 0) return p;
        return f.filter(n) ? [...p, f.id] : p;
      }, []),
    ];
  }, []);
  // console.log("hits", hits);
  const chars = hits
    .map<[string[], number]>((h, i) => [h, i])
    .filter((h) => h[0].length > 0);
  chars.sort((p, n) => n[0].length - p[0].length);
  const sc: { group: string; ids: number[] }[] = [];
  chars.forEach((c) => {
    // console.log("char", characters[c[1]].name);
    const addToGroup = (g: string, id: number) => {
      // console.log("Add", g, id);
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
  // console.log(sc.map((r) => [r.group, r.ids.map((i) => characters[i].name)]));
  sc.sort((p, n) => p.ids.length - n.ids.length);
  return sc;
};
