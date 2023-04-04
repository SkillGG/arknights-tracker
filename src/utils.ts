/**
 * Shalowly copy an object
 * @param p Object to copy
 * @returns A shallow copy of the object
 */
export const ShallowCopy = <T>(p: T) =>
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

export type PageType = "recruit" | "pity" | "recHis" | "stats";

export type Settings = {
    saveHistory: boolean;
    sendHistoryToDB: boolean;
    characterDatabase: boolean;
    clickToSelectOutcome: boolean;
    allowCombinations: boolean;
};

/**
 * Deafult User settings
 */
const DEF_SETTINGS: Settings = {
    saveHistory: true,
    sendHistoryToDB: false,
    characterDatabase: false,
    clickToSelectOutcome: false,
    allowCombinations: true,
};
export const DEFAULT_SETTINGS = JSON.stringify(DEF_SETTINGS);

export type Filter = {
    filter(d: ArkData): boolean;
    id: string;
    time: number;
};

export type PastRecruitment = {
    date: number;
    tags: string[];
    picked: string[];
    outcome?: string;
    time: number;
};

export type FullRecruitmentTags = PastRecruitment["tags"];

export type LinkData =
    | {
          path: "recruit";
          filters: string[];
          time: number;
      }
    | { path: "pity" }
    | { path: "recHis" };

/**
 * Get Data from href of the window
 * @returns Data about current href parameters
 */
export const parseLocation = (): LinkData => {
    const path = location.pathname.replace(/\//g, "");
    if (path === "") location.pathname = "recruit";
    if (path === "pity") return { path: "pity" };
    if (path === "recHis") return { path: "recHis" };
    else if (path === "recruit") {
        const filterSearch = decodeURI(
            /filter=([^&]*)/.exec(location.search)?.[1] || ""
        );
        const timeSearch = /time=([^&]*)/.exec(location.search)?.[1];
        const time: number = parseFloat(timeSearch || "9");
        const filters: string[] = [];
        if (filterSearch) filters.push(...filterSearch.split(","));
        return { path: "recruit", filters, time };
    } else return { path: "recruit", filters: [], time: 9 };
};

export const toggleTag = (tags: string[], tag: string): string[] => {
    if (tags.includes(tag)) return tags.filter((t) => t !== tag);
    else return [...tags, tag];
};

/**
 * Turns array of Filter IDs into proper Filters
 *
 * Adds 3 "empty" filters that apply everytime regardless of chosen tags
 * @param tags Filter IDs
 * @param time How long does the recruitment take
 * @returns An array of Filters to filter the data by
 */
export const getFilters = (tags: string[], time?: number): Filter[] => {
    if (!time) time = 9;
    if (time < 1 || time > 9) time = 9;
    const canBeTop = tags.includes("Top Operator");
    // const canBeSenior = tags.includes("Senior Operator");
    const canBe1Star = time < 4;
    const canBe2Star = time < 8;
    return [
        ...tags
            .map((t) => ({
                filter: (d: ArkData) => {
                    return d.tags.includes(t);
                },
                id: t,
                time: time || 9,
            }))
            .filter((f) => f.id.charAt(0) !== "-"),
        {
            filter: (d: ArkData) => (d.stars === 6 ? canBeTop : true),
            id: "",
            time,
        },
        {
            filter: (d: ArkData) => (d.stars === 2 ? canBe2Star : true),
            id: "",
            time,
        },
        {
            filter: (d: ArkData) => (d.stars === 1 ? canBe1Star : true),
            id: "",
            time,
        },
    ];
};

/**
 * Filter all charactes that match selected filters
 * @param characters All character data from JSON (typed)
 * @param filters Filters that are applied
 * @returns Filtered Characters
 */
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

/**
 * Shallowly checks if two arrays have the same values (removing all duplicates)
 * @param arr1 First Array
 * @param arr2 Second Array
 * @returns Shallow check if the arrays have the same values
 */
const haveSameValues = <T extends number | string>(
    arr1: T[],
    arr2: T[]
): boolean => {
    /**
     * Remove duplicates
     */
    const s1 = [...new Set(arr1)];
    const s2 = [...new Set(arr2)];
    if (s1.length !== s2.length) return false;
    for (let i = 0; i < s1.length; i++) {
        if (!s2.includes(s1[i])) return false;
    }
    return true;
};

export const calculateRecruitmentCharactersv2 = (
    characters: ArkData[],
    filters: Filter[]
): LazyRecGroup[] => {
    if (filters.length === 0) return [];

    /**
     * Get only filters with IDs
     */
    const regf = filters.filter((f) => f.id);

    /**
     * All possible tag combinations with given tags
     */
    const groups: RecruitmentGroup[] = [];

    /**
     * Add a group if it doesn't exist yet
     * @param group tags this group consists of
     */
    const addGroup = (group: string[]) => {
        // Check if group already exists
        const gg = groups.find((g) => haveSameValues<string>(group, g.group));
        if (!gg) {
            // If group doesn't exist - add characters to it
            const chars = getCharactersForFilters(
                characters,
                getFilters(group, filters[0].time)
            );
            if (chars.length > 0)
                groups.push({
                    chars: new Set(chars),
                    group,
                });
        }
    };

    /**
     * All selected tags (without duplicates)
     */
    const matchingTags = new Set<string>(regf.map((f) => f.id));

    /**
     * Grouping tags up to 3 in length
     */
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

    /**
     * Returns a value of a group (higher = better) calculated by both counting stars and length
     * @param chars Characters in a group
     * @returns Number representing value of the group (higher = better group)
     */
    const calculateGroupPoints = (chars: Set<ArkData>) => {
        const leastStars = [...chars].reduce(
            (p, n) => (p > n.stars ? n.stars : p),
            6
        );
        return 1000 * leastStars + (999 - [...chars].length);
    };

    /**
     * Sorting by ammount of ops in each group
     */
    // TODO: Sort by least-starred operator
    groups.sort(
        (a, b) => calculateGroupPoints(b.chars) - calculateGroupPoints(a.chars)
    );

    /**
     * Change from Set<ArkData> to ArkData[]
     */
    return groups.map((g) => ({ ...g, chars: [...g.chars] }));
};
