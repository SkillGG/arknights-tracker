import { FunctionComponent, useState } from "react";

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

  const [showRoll, setShowRoll] = useState(false);

  return (
    <div className="rollType">
      <fieldset>
        <legend>{name}</legend>
        {img && <img src={img} />}
        <p>
          6*:
          {count < 50 ? 2 : (count - 50 + 1) * 2 + 2}% ({count}/50)
        </p>
        <p> 5*: 8%</p>
        <p> 4*: 50%</p>
        <p> 3*: 40%</p>
        <button
          className="roll"
          onClick={() => {
            setShowRoll(!showRoll);
          }}
        >
          Roll
        </button>
        <ul
          className="dropdown_menu dropdown_menu--animated dropdown_menu-6"
          style={showRoll ? { display: "block" } : {}}
        >
          <li style={{ color: "darkgoldenrod" }} onClick={() => resetCount()}>
            {"★".repeat(6)}
          </li>
          {(!first10 || count < 9) && (
            <li
              onClick={() => {
                addCount();
              }}
            >
              &lt;={"★".repeat(5)}
            </li>
          )}
        </ul>
      </fieldset>
    </div>
  );
};

export default PityTrackerWindow;
