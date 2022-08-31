import React, { FunctionComponent } from "react";
import { Filter, Settings } from "./utils";

interface FilterPickerProps {
  isSelected: (s: string) => boolean;
  select: (s: string) => void;
  unselectAll: () => void;
  tag: boolean;
  setTag: React.Dispatch<React.SetStateAction<boolean>>;
  settings: Settings;
  tagsRefreshed(): void;
}

import "./picker.css";

/*
TODO: Swap the placement of the tags to match the order they appear in the game

Guard > Sniper > Defender > Medic >  Specialist > Caster > Vanguard  > Supporter 

Starter > Senior Operator > Top Operator

Melee Ranged

AoE > Defense > Healing > Support > Slow > Fast-Redeploy > Survival > DP-Recovery > Shift > Summon
??REST??

*/

const FilterPicker: FunctionComponent<FilterPickerProps> = ({
  isSelected,
  select,
  unselectAll,
  tag,
  setTag,
  tagsRefreshed,
}) => {
  return (
    <>
      <div className="howto">
        <h3>How to use:</h3>
        <ol>
          <li>Select tags that came out</li>
          <li>Click the panel with tags you used in recrutation</li>
          <li>
            Go to recruitment to select the outcome after the recrutation ended!
          </li>
        </ol>
      </div>
      <div id="filterpicker">
        <div className="qual">
          <div className="head">Qualification</div>
          <div className="opts smallscreens">
            <button
              className="tech"
              data-selected={isSelected("Starter")}
              onClick={() => select("Starter")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Starter
            </button>
            <button
              className="tech"
              data-selected={isSelected("Senior Operator")}
              onClick={() => select("Senior Operator")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Senior Operator
            </button>
            <button
              className="tech"
              data-selected={isSelected("Top Operator")}
              onClick={() => select("Top Operator")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Top Operator
            </button>
          </div>
        </div>
        <div className="qual">
          <div className="head">Position</div>
          <div className="opts">
            <button
              className="tech"
              data-selected={isSelected("Ranged")}
              onClick={() => select("Ranged")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Ranged
            </button>
            <button
              className="tech"
              data-selected={isSelected("Melee")}
              onClick={() => select("Melee")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Melee
            </button>
          </div>
        </div>
        <div className="qual">
          <div className="head">Class</div>
          <div className="opts tags smallscreens">
            <button
              className="tech"
              data-selected={isSelected("Caster")}
              onClick={() => select("Caster")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Caster
            </button>
            <button
              className="tech"
              data-selected={isSelected("Sniper")}
              onClick={() => select("Sniper")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Sniper
            </button>
            <button
              className="tech"
              data-selected={isSelected("Defender")}
              onClick={() => select("Defender")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Defender
            </button>
            <button
              className="tech"
              data-selected={isSelected("Guard")}
              onClick={() => select("Guard")}
              onMouseUp={(e) => e.currentTarget.blur()}
            >
              Guard
            </button>
            <button
              className="tech"
              data-selected={isSelected("Medic")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Medic")}
            >
              Medic
            </button>
            <button
              className="tech"
              data-selected={isSelected("Specialist")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Specialist")}
            >
              Specialist
            </button>
            <button
              className="tech"
              data-selected={isSelected("Supporter")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Supporter")}
            >
              Supporter
            </button>
            <button
              className="tech"
              data-selected={isSelected("Vanguard")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Vanguard")}
            >
              Vanguard
            </button>
          </div>
        </div>
        <div className="qual">
          <div className="head">Tags</div>
          <div className="opts tags smallscreens">
            <button
              className="tech"
              data-selected={isSelected("AoE")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("AoE")}
            >
              AoE
            </button>
            <button
              className="tech"
              data-selected={isSelected("Control")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Control")}
            >
              Control
            </button>
            <button
              className="tech"
              data-selected={isSelected("Crowd-Control")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Crowd-Control")}
            >
              Crowd-Control
            </button>
            <button
              className="tech"
              data-selected={isSelected("Debuff")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Debuff")}
            >
              Debuff
            </button>
            <button
              className="tech"
              data-selected={isSelected("Defense")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Defense")}
            >
              Defense
            </button>
            <button
              className="tech"
              data-selected={isSelected("DP-Recovery")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("DP-Recovery")}
            >
              DP-Recovery
            </button>
            <button
              className="tech"
              data-selected={isSelected("DPS")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("DPS")}
            >
              DPS
            </button>
            <button
              className="tech"
              data-selected={isSelected("Fast-Redeploy")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Fast-Redeploy")}
            >
              Fast-Redeploy
            </button>
            <button
              className="tech"
              data-selected={isSelected("Healing")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Healing")}
            >
              Healing
            </button>
            <button
              className="tech"
              data-selected={isSelected("Nuker")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Nuker")}
            >
              Nuker
            </button>
            <button
              className="tech"
              data-selected={isSelected("Robot")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Robot")}
            >
              Robot
            </button>
            <button
              className="tech"
              data-selected={isSelected("Shift")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Shift")}
            >
              Shift
            </button>
            <button
              className="tech"
              data-selected={isSelected("Slow")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Slow")}
            >
              Slow
            </button>
            <button
              className="tech"
              data-selected={isSelected("Summon")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Summon")}
            >
              Summon
            </button>
            <button
              className="tech"
              data-selected={isSelected("Support")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Support")}
            >
              Support
            </button>
            <button
              className="tech"
              data-selected={isSelected("Survival")}
              onMouseUp={(e) => e.currentTarget.blur()}
              onClick={() => select("Survival")}
            >
              Survival
            </button>
          </div>
        </div>
        <button className="clear" onClick={() => unselectAll()}>
          Clear all
        </button>
        <button
          className="clear"
          onClick={() => {
            tagsRefreshed();
          }}
        >
          Refresh
        </button>
        <button
          className={`clear ${tag ? "" : "tag_closed"}`}
          onClick={() => setTag(!tag)}
        >
          Show tags
        </button>
      </div>
    </>
  );
};

export default FilterPicker;
