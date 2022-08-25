import React, { useState } from "react";
import {
  ArkData,
  Filter,
  PastRecruitment,
  getCharactersForFilters,
  Settings,
} from "./utils";
interface RecruitmentHistoryProps {
  recHistory: PastRecruitment[];
  setOutcome(date: number, outcome: ArkData): void;
  characters: ArkData[];
  settings: Settings;
  removeFromHistory(date: number): void;
}

import "./history.css";
import "./characters.css";
import Character from "./Character";

const RecruitmentHistory: React.FunctionComponent<RecruitmentHistoryProps> = ({
  recHistory,
  characters,
  settings,
  setOutcome,
  removeFromHistory,
}) => {
  const [outcomeModal, setOutcomeModal] = useState(0);

  const [possibleOutcomes, setPossibleOutcomes] = useState<ArkData[]>([]);

  return (
    <>
      <table className="history">
        <thead>
          <tr>
            <th>No.</th>
            <th>Tags</th>
            <th>Picked</th>
            <th>Outcome</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {recHistory.map((rec, i) => (
            <tr key={`rec${rec.date}`}>
              <td>{i + 1}.</td>
              <td>{rec.tags.join(", ")}</td>
              <td>{rec.picked.join(", ")}</td>
              <td>
                {rec.outcome || (
                  <button
                    onClick={() => {
                      const sc = getCharactersForFilters(
                        characters,
                        rec.picked.map((tag) => {
                          const filter: Filter = {
                            filter: (d) => d.tags.includes(tag),
                            id: tag,
                          };
                          return filter;
                        })
                      );
                      console.log(
                        sc,
                        rec.picked.map((tag) => {
                          const filter: Filter = {
                            filter: (d) => d.tags.includes(tag),
                            id: tag,
                          };
                          return filter;
                        })
                      );
                      sc.sort((p, n) => n.stars - p.stars);
                      setPossibleOutcomes(sc);
                      setOutcomeModal(rec.date);
                    }}
                  >
                    Add Outcome
                  </button>
                )}
              </td>
              <td>{new Date(rec.date).toDateString()}</td>
              <td
                onClick={() => {
                  removeFromHistory(rec.date);
                }}
              >
                Delete
              </td>
            </tr>
          ))}
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
            <div className="characters">
              {possibleOutcomes.map((po) => (
                <div
                  onClick={() => {
                    console.log("Selected", po.name);
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
