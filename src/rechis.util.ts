import { PastRecruitment } from "./utils";

type SingularHistoryUpdate = {
  d: number;
  f: (p: PastRecruitment) => PastRecruitment;
};
type FullHistoryUpdate = { f: (p: PastRecruitment[]) => PastRecruitment[] };

export type HistoryUpdate = FullHistoryUpdate | SingularHistoryUpdate;

export const isFullHistoryUpdate = (p: HistoryUpdate): p is FullHistoryUpdate =>
  typeof (p as any).d !== "number";

export const RecHis = {
  compress: (d: PastRecruitment[]) => {
    return d
      .filter((d) => d.date > 0)
      .map((r) => {
        return `${r.date}.${r.tags.join(",")}.${r.picked.join(",")}.${
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
        tags: tags.split(","),
        picked: picked.split(","),
        outcome: outcome === "-" ? undefined : outcome,
      };
    });
  },
};
