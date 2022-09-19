export const ShallowCopy = (p: any) =>
  typeof p === "object"
    ? Object.assign({}, p)
    : Array.isArray(p)
    ? Object.assign([], p)
    : p;

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
  if (path === "") location.pathname = "recruit";
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
  const chars =
    lfh.length > 0
      ? characters.filter((c) =>
          lfh.reduce<boolean>((p, n) => p && n.filter(c), true)
        )
      : characters;
  const groups: RecruitmentGroup[] = [];
  const addGroup = (group: string[]) => {
    const gg = groups.find(
      (g) => symmetricArrayDiff<string>(group, g.group).length === 0
    );
    if (!gg) {
      const chars = getCharactersForFilters(characters, getFilters(group));
      if (chars.length > 0)
        groups.push({
          chars: new Set(chars),
          group,
        });
    }
  };
  const matchingTags = new Set<string>(regf.map((f) => f.id));

  [...matchingTags].forEach((m) => {
    addGroup([m]);
    [...matchingTags]
      .filter((t) => t !== m)
      .forEach((m2) => {
        addGroup([m, m2]);
        [...matchingTags]
          .filter((mt) => mt !== m2 && mt !== m)
          .forEach((m3) => {
            addGroup([m, m2, m3]);
          });
      });
  });

  groups.sort((a, b) => [...a.chars].length - [...b.chars].length);
  return groups.map((g) => ({ ...g, chars: [...g.chars] }));
};
