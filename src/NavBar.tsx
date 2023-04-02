import React, { FC, useState } from "react";
import { PageType, Settings } from "./utils";

interface NavBarProps {
    page: PageType;
    moveToPage(page: PageType): void;
    settings: Settings;
    changeSetting(setting: keyof Settings, value: Settings[keyof Settings]): void;
}

import "./NavBar.css";

const NavBar: FC<NavBarProps> = ({
    page,
    moveToPage,
    settings,
    changeSetting,
}) => {
    const [settingsModal, setSettingsModal] = useState(false);

    return (
        <>
            <div className="navSwitches">
                {page !== "recruit" && (
                    <button
                        className="navSwitch"
                        onClick={() => moveToPage("recruit")}
                    >
                        Recruitment
                    </button>
                )}
                {page !== "recHis" && (
                    <button
                        className="navSwitch"
                        onClick={() => moveToPage("recHis")}
                    >
                        History
                    </button>
                )}
                {page !== "pity" && (
                    <button
                        className="navSwitch"
                        onClick={() => moveToPage("pity")}
                    >
                        Pity
                    </button>
                )}
                <button
                    className="navSwitch"
                    onClick={() => setSettingsModal(true)}
                >
                    Settings
                </button>
            </div>
            <div
                className={`settings${settingsModal ? " shown" : ""}`}
                onClick={(e) => {
                    const target = e.target as Element;
                    if (target.className.includes("shown"))
                        setSettingsModal(false);
                }}
            >
                <div className="settings-content">
                    <fieldset>
                        <legend>Recruitment Settings</legend>
                        <div className="setting-box">
                            <label htmlFor="save-history">
                                Track Recruitment History
                            </label>
                            <input
                                type="checkbox"
                                name=""
                                id="save-history"
                                checked={settings.saveHistory}
                                onChange={() =>
                                    changeSetting(
                                        "saveHistory",
                                        !settings.saveHistory
                                    )
                                }
                            />
                        </div>
                        <div className="setting-box">
                            <label htmlFor="save-db">
                                Send Data to Database
                            </label>
                            <input
                                type="checkbox"
                                disabled={true}
                                name=""
                                id="save-db"
                                checked={settings.sendHistoryToDB}
                                onChange={() =>
                                    changeSetting(
                                        "sendHistoryToDB",
                                        !settings.sendHistoryToDB
                                    )
                                }
                            />
                        </div>
                        <div className="setting-box">
                            <label htmlFor="save-outside">
                                Click character to open it&apos;s database entry
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
                                disabled={
                                    settings.characterDatabase ||
                                    !settings.saveHistory
                                }
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
                        <div className="setting-box">
                            <label htmlFor="allow-combinations">
                                Allow selecting combinations without any
                                characters
                            </label>
                            <input
                                type="checkbox"
                                name=""
                                id="allow-combinations"
                                checked={settings.allowCombinations}
                                onChange={() =>
                                    changeSetting(
                                        "allowCombinations",
                                        !settings.allowCombinations
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
