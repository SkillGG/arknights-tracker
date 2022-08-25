import React, { useState } from "react";
import {
  checkIfIsASetting,
  DEFAULT_SETTINGS,
  PageType,
  Settings,
} from "./utils";

interface NavBarProps {
  page: PageType;
  moveToPage(page: PageType): void;
  settings: Settings;
  changeSetting(setting: string, value: any): void;
}

import "./NavBar.css";

const NavBar: React.FunctionComponent<NavBarProps> = ({
  page,
  moveToPage,
  settings,
  changeSetting,
}) => {
  const [settingsModal, setSettingsModal] = useState(false);

  return (
    <>
      <div className="switches">
        {page !== "recruit" && (
          <button className="switch" onClick={() => moveToPage("recruit")}>
            Recruitment
          </button>
        )}
        {page !== "recHis" && (
          <button className="switch" onClick={() => moveToPage("recHis")}>
            History
          </button>
        )}
        {page !== "pity" && (
          <button className="switch" onClick={() => moveToPage("pity")}>
            Pity
          </button>
        )}
        <button className="switch" onClick={() => setSettingsModal(true)}>
          Settings
        </button>
      </div>
      <div
        className={`settings${settingsModal ? " shown" : ""}`}
        onClick={(e) => {
          const target = e.target as Element;
          if (target.className.includes("shown")) setSettingsModal(false);
        }}
      >
        <div className="settings-content">
          <fieldset>
            <legend>Recruitment Settings</legend>
            <div className="setting-box">
              <label htmlFor="save-history">Track Recruitment History</label>
              <input
                type="checkbox"
                name=""
                id="save-history"
                checked={settings.saveHistory}
                onChange={() =>
                  changeSetting("saveHistory", !settings.saveHistory)
                }
              />
            </div>
            <div className="setting-box">
              <label htmlFor="save-db">Send Data to Database</label>
              <input
                type="checkbox"
                disabled={!settings.saveHistory}
                name=""
                id="save-db"
                checked={settings.sendHistoryToDB}
                onChange={() =>
                  changeSetting("sendHistoryToDB", !settings.sendHistoryToDB)
                }
              />
            </div>
            <div className="setting-box">
              <label htmlFor="save-outside">
                Click character to open it's database entry
              </label>
              <input
                type="checkbox"
                name=""
                id="save-outside"
                checked={settings.characterDatabase}
                onChange={() =>
                  changeSetting(
                    "characterDatabase",
                    !settings.characterDatabase
                  )
                }
              />
            </div>
            <div className="setting-box">
              <label htmlFor="save-outcome">
                Click character to select it as outcome
              </label>
              <input
                type="checkbox"
                disabled={settings.characterDatabase || !settings.saveHistory}
                name=""
                id="save-outcome"
                checked={settings.clickToSelectOutcome}
                onChange={() =>
                  changeSetting(
                    "clickToSelectOutcome",
                    !settings.clickToSelectOutcome
                  )
                }
              />
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default NavBar;
