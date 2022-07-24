export type ArkData = {
  tags: string[];
  name: string;
  stars: number;
  image: string;
};

export type Filter = {
  filter(d: ArkData): boolean;
  id: string;
};

export type LinkData =
  | {
      path: "recruit";
      filters: string[];
    }
  | { path: "pity" };

export const parseLocation = (): LinkData => {
  const path = location.pathname.replace(/\//g, "");
  if (path === "pity") return { path: "pity" };
  else if (path === "recruit") {
    const filterSearch = /filter=([^&]*)/.exec(location.search)?.[1];
    const filters: string[] = [];
    if (filterSearch) filters.push(...filterSearch.split(","));
    return { path: "recruit", filters };
  } else return { path: "recruit", filters: [] };
};
