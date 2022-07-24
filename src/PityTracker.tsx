import { FunctionComponent, useEffect, useState } from "react";

interface PityTrackerProps {}

type PityTrackerData = {
  standard: number;
  special: number;
};

const PityTracker: FunctionComponent<PityTrackerProps> = ({}) => {
  const [pityTracker, setPityTracker] = useState<PityTrackerData>({
    standard: parseInt(localStorage.getItem("standardPity") || "0"),
    special: 0,
  });

  useEffect(() => {
    let set = true;
    (async () => {
      const sID = await fetch(
        "https://raw.githubusercontent.com/SkillGG/arknights-tracker/master/src/specialID"
      ).then((r) => r.text());
      if (sID && set) {
        setPityTracker({
          ...pityTracker,
          special: parseInt(localStorage.getItem(sID) || "0"),
        });
      }
    })();
    return () => {
      set = false;
    };
  }, []);

  return <></>;
};

export default PityTracker;
