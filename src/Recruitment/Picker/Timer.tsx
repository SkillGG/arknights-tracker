import React, { Dispatch, FC, SetStateAction } from "react";

interface PickerTimerProps {
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
}
export const timeToHuman = (time: number) =>
    `${Math.trunc(time)}:${((time - Math.trunc(time)) * 60)
        .toString()
        .padStart(2, "0")}`;

const PickerTimer: FC<PickerTimerProps> = ({ time, setTime }) => {
    const addTime = (nt: number) => {
        if (time + nt <= 9 && time + nt >= 1) setTime((p) => p + nt);
        if (time + nt < 1) setTime(9);
        if (time + nt > 9) setTime(1);
    };

    return (
        <>
            <div className="opts timer">
                <button className="tech timerPlus" onClick={() => addTime(-1)}>
                    &lt;&lt;
                </button>
                <button
                    className="tech timerPlus"
                    onClick={() => addTime(-0.5)}
                >
                    &lt;
                </button>
                <div className="timerTime">{timeToHuman(time)}</div>
                <button
                    className="tech timerMinus"
                    onClick={() => addTime(0.5)}
                >
                    &gt;
                </button>
                <button className="tech timerMinus" onClick={() => addTime(1)}>
                    &gt;&gt;
                </button>
            </div>
        </>
    );
};

export default PickerTimer;
