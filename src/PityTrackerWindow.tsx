import React, { FunctionComponent, useState } from "react";

interface PityTrackerWindowProps {
  name: string;
  id: string;
  noF10: boolean;
  addCount(): void;
  resetCount(): void;
  count: number;
  img?: string;
}

const PityTrackerWindow: FunctionComponent<PityTrackerWindowProps> = ({
  name,
  id,
  count,
  addCount,
  resetCount,
  noF10 = false,
  img,
}) => {
  const [first10, setFirst10] = useState(
    noF10 ? false : localStorage.getItem(`${id}_first10`) ? false : true
  );

  const [f10Done, f10Undone] = [
    () => {
      setFirst10(false);
      localStorage.setItem(`${id}_first10`, "true");
    },
    () => {
      setFirst10(true);
      localStorage.removeItem(`${id}_first10`);
    },
  ];

  const [showRoll, setShowRoll] = useState(false);
  const [show10Roll, setShow10Roll] = useState(false);
  type TenRoll = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  const [tenRoll, setTenRoll] = useState<TenRoll>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const canBe5Star = (count: number, i: number, tenRoll: TenRoll) => {
    const prev = tenRoll.slice(0, i);
    const prevHas6Star = prev.includes(1);
    return prevHas6Star || count + i !== 9;
  };

  const add6Star = () => {
    resetCount();
    f10Done();
  };

  const add5Star = () => addCount();

  return (
    <div className="rollType">
      <fieldset>
        <legend>{name}</legend>
        {img && <img src={img} />}
        {first10 && <p className="f10">First 10 guarantee!</p>}
        <p>
          6*: {count < 50 ? 2 : (count - 50 + 1) * 2 + 2}% ({count}/50)
        </p>
        <p> 5*: 8%</p>
        <p> 4*: 50%</p>
        <p> 3*: 40%</p>
        <button
          className="roll"
          onClick={() => {
            setShowRoll(!showRoll);
            setShow10Roll(false);
          }}
        >
          Roll
        </button>
        <ul
          className="dropdown_menu dropdown_menu--animated dropdown_menu-6"
          style={showRoll ? { display: "block" } : {}}
        >
          <li style={{ color: "darkgoldenrod" }} onClick={() => add6Star()}>
            {"★".repeat(6)}
          </li>
          {(!first10 || count < 9) && (
            <li onClick={() => add5Star()}>&lt;={"★".repeat(5)}</li>
          )}
          <li
            onClick={() => {
              setShow10Roll(!show10Roll);
            }}
          >
            +10
          </li>
        </ul>
        <ul
          className="dropdown_menu"
          style={show10Roll ? { display: "block" } : {}}
        >
          {tenRoll.map((roll, i) => {
            return (
              <React.Fragment key={`tenRoll_roll#${i}`}>
                <li
                  style={{
                    color: "darkgoldenrod",
                    backgroundColor: tenRoll[i] === 1 ? "darkblue" : "",
                  }}
                  onClick={() => {
                    setTenRoll((p) => {
                      const r = p.map<number>((r, x) =>
                        x === i ? 1 : r
                      ) as TenRoll;
                      return r;
                    });
                  }}
                >
                  {"★".repeat(6)}
                </li>
                {(!first10 || canBe5Star(count, i, tenRoll)) && (
                  <li
                    onClick={() => {
                      setTenRoll((p) => {
                        const r = p.map<number>((r, x) =>
                          x === i ? 2 : r
                        ) as TenRoll;
                        return r;
                      });
                    }}
                    style={{
                      backgroundColor: tenRoll[i] === 2 ? "darkblue" : "",
                    }}
                  >
                    &lt;={"★".repeat(5)}
                  </li>
                )}
                <br />
              </React.Fragment>
            );
          })}
          <li
            onClick={() => {
              if (tenRoll.includes(0)) return;
              tenRoll.forEach((rl) => {
                if (rl === 1) add6Star();
                else add5Star();
              });
            }}
          >
            Save
          </li>
        </ul>
        <button
          className="reset"
          onClick={() => {
            resetCount();
            if (!noF10) f10Undone();
          }}
        >
          Reset Data
        </button>
      </fieldset>
    </div>
  );
};

export default PityTrackerWindow;
