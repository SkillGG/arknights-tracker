import { PastRecruitment } from "./utils";

type SingularHistoryUpdate = {
  d: number;
  f: (p: PastRecruitment) => PastRecruitment;
};
type FullHistoryUpdate = { f: (p: PastRecruitment[]) => PastRecruitment[] };

export type HistoryUpdate = FullHistoryUpdate | SingularHistoryUpdate;

export const isFullHistoryUpdate = (p: HistoryUpdate): p is FullHistoryUpdate =>
  typeof (p as any).d !== "number";

import FilterIDs from "./filterIDs.json";

const filterToID = (f: string) => {
  return FilterIDs.findIndex((fil) => fil === f);
};

export const RecHis = {
  compress: (d: PastRecruitment[]) => {
    return d
      .filter((d) => d.date > 0)
      .map((r) => {
        return `${r.date}.${r.tags
          .map((f) => filterToID(f))
          .join(",")}.${r.picked.map((f) => filterToID(f)).join(",")}.${
          r.outcome || "-"
        }`;
      })
      .join("||");
  },
  decompress: (str: string): PastRecruitment[] => {
    if (str.charAt(0) === "[") return JSON.parse(str); // backwards compatibility with JSON saved recruitment
    const records = str.split("||").filter((r) => r.length > 0);
    return records.map((rec) => {
      const [date, tags, picked, outcome] = rec.split(".");
      return {
        date: parseInt(date),
        tags: tags.split(",").map((f) => {
          return /\d/.exec(f) ? FilterIDs[parseInt(f, 10)] : f;
        }),
        picked: picked
          .split(",")
          .map(
            (f) =>
              `${f.charAt(0) === "-" ? "-" : ""}${
                /\d/.exec(f) ? FilterIDs[parseInt(f, 10)] : f
              }`
          ),
        outcome: outcome === "-" ? undefined : outcome,
      };
    });
  },
};
