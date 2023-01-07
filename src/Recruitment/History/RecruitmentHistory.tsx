import React, { useState } from "react";
import {
  ArkData,
  PastRecruitment,
  getCharactersForFilters,
  Settings,
  getFilters,
  ShallowCopy,
} from "../../utils";
interface RecruitmentHistoryProps {
  recHistory: PastRecruitment[];
  setOutcome(date: number, outcome: ArkData): void;
  characters: ArkData[];
  settings: Settings;
  removeFromHistory(date: number): void;
  toggleStrikeOut(date: number, tag: string): void;
}

import "./history.css";
import "./../Picker/characters.css";
import Character from "../Picker/Character";
import { HistoryFilters } from "./rechis.util";

const RecruitmentHistory: React.FunctionComponent<RecruitmentHistoryProps> = ({
  recHistory,
  characters,
  settings,
  setOutcome,
  removeFromHistory,
  toggleStrikeOut,
}) => {
  const [outcomeModal, setOutcomeModal] = useState(25);
  
  const [possibleOutcomes, setPossibleOutcomes] = useState<ArkData[]>([]);
  
  const [historyFilters, setHistoryFilters] = useState<HistoryFilters>({});

  const [hiddenHistory, setHiddenHistory] = useState(true);

  const calculateOutcomes = (date: number, tags: string[]) => {
    const sc = getCharactersForFilters(characters, getFilters(tags));
    sc.sort((p, n) => n.stars - p.stars);
    setPossibleOutcomes(sc);
    setOutcomeModal(date);
  };

  const filtersOut = (r: PastRecruitment, hs: HistoryFilters): boolean => {
    if (!hs.type) return false;
    if (hs.type === "finalised") return !r.outcome;
    if (hs.type === "refreshed") return !(!r.outcome && !r.picked.length);
    if (hs.type === "ongoing") return !(!r.outcome && !!r.picked.length);
    return false;
  };

  return (
    <>
      <div className="historyFilter">
        {hiddenHistory && (
          <button
            className="historyFilterButton"
            onClick={() => setHiddenHistory(false)}
          >
            Filter
          </button>
        )}

        {!hiddenHistory && (
          <>
            <button
              className="historyFilterButton"
              onClick={() => setHiddenHistory(true)}
            >
              Hide
            </button>
            <div>
              Items:{" "}
              {recHistory.reduce(
                (p, n) => p + (!filtersOut(n, historyFilters) ? 1 : 0),
                0
              )}
            </div>
            <div>
              <label htmlFor="finished">Finished:</label>
              <input
                type="radio"
                name="finished"
                id="finished"
                checked={historyFilters.type === "finalised"}
                onChange={(e) => {
                  setHistoryFilters((p) => ({ ...p, type: "finalised" }));
                }}
              />
            </div>
            <div>
              <label htmlFor="ongoing">Active:</label>
              <input
                type="radio"
                name="ongoing"
                id="ongoing"
                checked={historyFilters.type === "ongoing"}
                onChange={(e) => {
                  setHistoryFilters((p) => ({ ...p, type: "ongoing" }));
                }}
              />
            </div>
            <div>
              <label htmlFor="refreshed">Refreshed:</label>
              <input
                type="radio"
                name="refreshed"
                id="refreshed"
                checked={historyFilters.type === "refreshed"}
                onChange={(e) => {
                  setHistoryFilters((p) => ({ ...p, type: "refreshed" }));
                }}
              />
            </div>
            <br />
            <div>
              <button
                className="historyFilterButton"
                onClick={() =>
                  setHistoryFilters((p) => {
                    delete p.type;
                    return ShallowCopy(p);
                  })
                }
              >
                Clear
              </button>
            </div>
          </>
        )}
      </div>
      <table className="history">
        <thead>
          <tr>
            <th>No.</th>
            <th>Recruitment Tags</th>
            <th>Picked Tags</th>
            <th>Recruited Operator</th>
            <th>Date</th>
            {/* <th>Recruitment Length</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {recHistory.map((rec, i) =>
            rec.date == 0 || filtersOut(rec, historyFilters) ? null : (
              <tr key={`rec${rec.date}`}>
                <td>{i + 1}.</td>
                <td>{rec.tags.join(", ")}</td>
                {rec.picked.length > 0 ? (
                  <>
                    <td>
                      {rec.picked.map((r, x, o) => (
                        <React.Fragment key={`${rec.date}_table_${r}`}>
                          {r.charAt(0) === "-" ? <s>{r.substring(1)}</s> : r}
                          {x + 1 < o.length ? ", " : ""}
                        </React.Fragment>
                      ))}
                    </td>
                    <td>
                      {rec.outcome || (
                        <button
                          onClick={() => {
                            calculateOutcomes(rec.date, rec.picked);
                          }}
                        >
                          Add Outcome
                        </button>
                      )}
                    </td>
                  </>
                ) : (
                  <td colSpan={2}>Refreshed</td>
                )}
                <td>{new Date(rec.date).toDateString()}</td>
                <td
                  onClick={() => {
                    removeFromHistory(rec.date);
                  }}
                >
                  Delete
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div
        className={`outcome-modal${outcomeModal ? " outcome-show" : ""}`}
        onClick={(e) => {
          const target = e.target as Element;
          if (target.classList.contains("outcome-modal")) setOutcomeModal(0);
        }}
      >
        <div className="outcome category">
          <fieldset>
            <legend>Select outcome</legend>
            <div className="crossed">
              {recHistory
                .find((r) => r?.date === outcomeModal)
                ?.picked.map((r, n, a) => (
                  <button
                    key={`${outcomeModal}_${r}`}
                    className={`crossedSwitch ${
                      r.charAt(0) === "-" ? "crossedOut" : ""
                    }`}
                    onClick={() => {
                      toggleStrikeOut(outcomeModal, a[n]);
                      a[n] = r.charAt(0) === "-" ? r.substring(1) : `-${r}`;
                      calculateOutcomes(outcomeModal, a);
                    }}
                  >
                    {r.charAt(0) === "-" ? <s>{r.substring(1)}</s> : r}
                  </button>
                ))}
            </div>
            <div className="characters">
              {possibleOutcomes.map((po) => (
                <div
                  onClick={() => {
                    setOutcome(outcomeModal, po);
                    setOutcomeModal(0);
                  }}
                  key={`possible_${po.name}`}
                >
                  <Character
                    name={po.name}
                    image={po.image}
                    settings={{ ...settings, characterDatabase: false }}
                    stars={po.stars}
                    hoveredStyle={{ backgroundColor: "green" }}
                  />
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default RecruitmentHistory;
