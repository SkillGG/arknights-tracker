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
  if (
    FilterIDs.findIndex((fil) => fil === f) === -1 &&
    f.charAt(0) === "-" &&
    FilterIDs.findIndex((fil) => fil === f.substring(1)) === -1
  )
    console.error("Cannot find ", f, "in FilterIDs", FilterIDs);
  if (f.charAt(0) === "-")
    return "-" + FilterIDs.findIndex((fil) => fil === f.substring(1));
  return FilterIDs.findIndex((fil) => fil === f);
};

export const RecHis = {
  compress: (d: PastRecruitment[]) => {
    return d
      .filter((d) => d.date > 0)
      .map((r) => {
        return `${r.date}.${r.tags
          .map((f) => {
            return filterToID(f);
          })
          .join(",")}.${r.picked
          .map((f) => {
            return filterToID(f);
          })
          .join(",")}.${r.outcome || "-"}`;
      })
      .join("||");
  },
  decompress: (str: string): PastRecruitment[] => {
    if (str.charAt(0) === "[") return JSON.parse(str); // backwards compatibility with JSON saved recruitment
    const records = str.split("||").filter((r) => r.length > 0);
    try {
      return records.map((rec) => {
        const [date, tags, picked, outcome] = rec.split(".");
        const retObj = {
          date: parseInt(date),
          tags: tags
            .split(",")
            .filter((f) => f)
            .map((f) => {
              return /\d/.exec(f) ? FilterIDs[parseInt(f, 10)] : f;
            }),
          picked: picked
            .split(",")
            .filter((f) => f)
            .map((f) => {
              return !!f
                ? `${f.charAt(0) === "-" ? "-" : ""}${
                    /\d/.exec(f) ? FilterIDs[Math.abs(parseInt(f, 10))] : f
                  }`
                : "";
            }),
          outcome: outcome === "-" ? undefined : outcome,
        };
        return retObj;
      });
    } catch (e) {
      console.error("Buggy history string!");
      return [];
    }
  },
};
