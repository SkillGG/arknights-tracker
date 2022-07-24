import { FunctionComponent, useEffect, useState } from "react";

interface PityTrackerProps {}

type PityTrackerData = {
  standard: number;
  special: number;
};

import "./pity.css";

const PityTracker: FunctionComponent<PityTrackerProps> = ({}) => {
  const [pityTracker, setPityTracker] = useState<PityTrackerData>({
    standard: parseInt(localStorage.getItem("standardPity") || "0"),
    special: 0,
  });

  const [standardID, setStandardID] = useState<string>("");
  const [specialID, setSpecialID] = useState<string>("");

  const [first10, setFirst10] = useState(!localStorage.getItem("first10"));

  const [showStandardRoll, setShowStandardRoll] = useState(false);
  const [showSpecialRoll, setShowSpecialRoll] = useState(false);

  useEffect(() => {
    let set = true;
    (async () => {
      const specialID = await fetch(
        "https://raw.githubusercontent.com/SkillGG/arknights-tracker/master/src/specialID"
      ).then((r) => r.text());
      const standardID = await fetch(
        "https://raw.githubusercontent.com/SkillGG/arknights-tracker/master/src/standardID"
      ).then((r) => r.text());
      if (specialID && standardID && set) {
        setPityTracker({
          ...pityTracker,
          special: parseInt(localStorage.getItem(specialID) || "0"),
        });
        setSpecialID(specialID);
        setStandardID(standardID);
        if (localStorage.getItem("standardID") !== standardID) {
          localStorage.removeItem("first10");
          setFirst10(true);
        }
      }
    })();
    return () => {
      set = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("standardPity", `${pityTracker.standard}`);
    if (specialID) localStorage.setItem(specialID, `${pityTracker.special}`);
  }, [pityTracker.standard, pityTracker.special]);

  return (
    <div id="pityTracker">
      <div className="rollType">
        <fieldset>
          <legend>Standard</legend>
          {first10 ? "First 10" : ""}
          <p>
            6*:
            {pityTracker.standard < 50
              ? 2
              : (pityTracker.standard - 50 + 1) * 2 + 2}
            % ({pityTracker.standard}/50)
          </p>
          <p> 5*: 8%</p>
          <p> 4*: 50%</p>
          <p> 3*: 40%</p>
          <button
            className="roll"
            onClick={() => {
              setShowStandardRoll(!showStandardRoll);
            }}
          >
            Roll
          </button>
          <ul
            className="dropdown_menu dropdown_menu--animated dropdown_menu-6"
            style={showStandardRoll ? { display: "block" } : {}}
          >
            <li
              style={{ color: "darkgoldenrod" }}
              onClick={() =>
                setPityTracker((p) => {
                  return { ...p, standard: 0 };
                })
              }
            >
              {"★".repeat(6)}
            </li>
            <li
              onClick={() => {
                if (first10 && pityTracker.standard + 1 > 10) {
                  localStorage.removeItem("first10");
                  setFirst10(false);
                }
                setPityTracker((p) => {
                  return { ...p, standard: p.standard + 1 };
                });
              }}
            >
              &lt;={"★".repeat(5)}
            </li>
          </ul>
        </fieldset>
      </div>
      <div className="rollType">
        <fieldset>
          <legend>Special</legend>
        </fieldset>
      </div>
    </div>
  );
};

export default PityTracker;
