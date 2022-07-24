import React, { FunctionComponent } from "react";
import { Filter } from "./utils";

interface FilterPickerProps {
  isSelected: (s: string) => boolean;
  select: (s: string) => void;
  unselectAll: () => void;
  tag: boolean;
  setTag: React.Dispatch<React.SetStateAction<boolean>>;
}

import "./picker.css";

const FilterPicker: FunctionComponent<FilterPickerProps> = ({
  isSelected,
  select,
  unselectAll,
  tag,
  setTag,
}) => {
  return (
    <>
      <div id="filterpicker">
        <div className="qual">
          <div className="head">Qualification</div>
          <div className="opts smallscreens">
            <div
              className="tech"
              data-selected={isSelected("Starter")}
              onClick={() => select("Starter")}
            >
              Starter
            </div>
            <div
              className="tech"
              data-selected={isSelected("Senior Operator")}
              onClick={() => select("Senior Operator")}
            >
              Senior Operator
            </div>
            <div
              className="tech"
              data-selected={isSelected("Top Operator")}
              onClick={() => select("Top Operator")}
            >
              Top Operator
            </div>
          </div>
        </div>
        <div className="qual">
          <div className="head">Position</div>
          <div className="opts">
            <div
              className="tech"
              data-selected={isSelected("Ranged")}
              onClick={() => select("Ranged")}
            >
              Ranged
            </div>
            <div
              className="tech"
              data-selected={isSelected("Melee")}
              onClick={() => select("Melee")}
            >
              Melee
            </div>
          </div>
        </div>
        <div className="qual">
          <div className="head">Class</div>
          <div className="opts tags smallscreens">
            <div
              className="tech"
              data-selected={isSelected("Caster")}
              onClick={() => select("Caster")}
            >
              Caster
            </div>
            <div
              className="tech"
              data-selected={isSelected("Sniper")}
              onClick={() => select("Sniper")}
            >
              Sniper
            </div>
            <div
              className="tech"
              data-selected={isSelected("Defender")}
              onClick={() => select("Defender")}
            >
              Defender
            </div>
            <div
              className="tech"
              data-selected={isSelected("Guard")}
              onClick={() => select("Guard")}
            >
              Guard
            </div>
            <div
              className="tech"
              data-selected={isSelected("Medic")}
              onClick={() => select("Medic")}
            >
              Medic
            </div>
            <div
              className="tech"
              data-selected={isSelected("Specialist")}
              onClick={() => select("Specialist")}
            >
              Specialist
            </div>
            <div
              className="tech"
              data-selected={isSelected("Supporter")}
              onClick={() => select("Supporter")}
            >
              Supporter
            </div>
            <div
              className="tech"
              data-selected={isSelected("Vanguard")}
              onClick={() => select("Vanguard")}
            >
              Vanguard
            </div>
          </div>
        </div>
        <div className="qual">
          <div className="head">Tags</div>
          <div className="opts tags smallscreens">
            <div
              className="tech"
              data-selected={isSelected("AoE")}
              onClick={() => select("AoE")}
            >
              AoE
            </div>
            <div
              className="tech"
              data-selected={isSelected("Control")}
              onClick={() => select("Control")}
            >
              Control
            </div>
            <div
              className="tech"
              data-selected={isSelected("Crowd-Control")}
              onClick={() => select("Crowd-Control")}
            >
              Crowd-Control
            </div>
            <div
              className="tech"
              data-selected={isSelected("Debuff")}
              onClick={() => select("Debuff")}
            >
              Debuff
            </div>
            <div
              className="tech"
              data-selected={isSelected("Defense")}
              onClick={() => select("Defense")}
            >
              Defense
            </div>
            <div
              className="tech"
              data-selected={isSelected("DP-Recovery")}
              onClick={() => select("DP-Recovery")}
            >
              DP-Recovery
            </div>
            <div
              className="tech"
              data-selected={isSelected("DPS")}
              onClick={() => select("DPS")}
            >
              DPS
            </div>
            <div
              className="tech"
              data-selected={isSelected("Fast-Redeploy")}
              onClick={() => select("Fast-Redeploy")}
            >
              Fast-Redeploy
            </div>
            <div
              className="tech"
              data-selected={isSelected("Healing")}
              onClick={() => select("Healing")}
            >
              Healing
            </div>
            <div
              className="tech"
              data-selected={isSelected("Nuker")}
              onClick={() => select("Nuker")}
            >
              Nuker
            </div>
            <div
              className="tech"
              data-selected={isSelected("Robot")}
              onClick={() => select("Robot")}
            >
              Robot
            </div>
            <div
              className="tech"
              data-selected={isSelected("Shift")}
              onClick={() => select("Shift")}
            >
              Shift
            </div>
            <div
              className="tech"
              data-selected={isSelected("Slow")}
              onClick={() => select("Slow")}
            >
              Slow
            </div>
            <div
              className="tech"
              data-selected={isSelected("Summon")}
              onClick={() => select("Summon")}
            >
              Summon
            </div>
            <div
              className="tech"
              data-selected={isSelected("Support")}
              onClick={() => select("Support")}
            >
              Support
            </div>
            <div
              className="tech"
              data-selected={isSelected("Survival")}
              onClick={() => select("Survival")}
            >
              Survival
            </div>
          </div>
        </div>
        <div className="clear" onClick={() => unselectAll()}>
          Clear all
        </div>
        <div
          className={`clear ${tag ? "" : "tag_closed"}`}
          onClick={() => setTag(!tag)}
        >
          Show tags
        </div>
      </div>
    </>
  );
};

export default FilterPicker;
