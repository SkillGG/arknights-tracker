import React, { Dispatch, SetStateAction, FC } from "react";
import { Settings } from "../../utils";

interface FilterPickerProps {
    isSelected: (s: string) => boolean;
    select: (s: string) => void;
    unselectAll: () => void;
    tag: boolean;
    setTag: Dispatch<SetStateAction<boolean>>;
    settings: Settings;
    tagsRefreshed(): void;
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
}

import "./picker.css";
import Timer from "./Timer";

import Qualifications from "./quals.json";

/*
TODO: Swap the placement of the tags to match the order they appear in the game

Guard > Sniper > Defender > Medic >  Specialist > Caster > Vanguard  > Supporter 

Starter > Senior Operator > Top Operator

Melee Ranged

AoE > Defense > Healing > Support > Slow > Fast-Redeploy > Survival > DP-Recovery > Shift > Summon
??REST??

*/

const FilterPicker: FC<FilterPickerProps> = ({
    isSelected,
    select,
    unselectAll,
    tag,
    setTag,
    tagsRefreshed,
    time,
    setTime,
}) => {
    return (
        <>
            <div className="howto">
                <h3>How to use:</h3>
                <ol>
                    <li>Select tags that came out</li>
                    <li>Click the panel with tags you used in recrutation</li>
                    <li>
                        Go to recruitment to select the outcome after the
                        recrutation ended!
                    </li>
                </ol>
            </div>
            <div id="filterpicker">
                {Qualifications.map((q) => {
                    return (
                        <div key={q.name} className="qual">
                            <div className="head">{q.name}</div>
                            <div className={`opts ${q.optsClass} smallscreens`}>
                                {q.categories.map((cat) => {
                                    return (
                                        <button
                                            key={cat}
                                            className={"tech"}
                                            data-selected={isSelected(cat)}
                                            onClick={() => select(cat)}
                                            onMouseUp={(e) =>
                                                e.currentTarget.blur()
                                            }
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
                <div className="qual">
                    <div className="head">Timer</div>
                    <div>
                        <Timer time={time} setTime={setTime} />
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
