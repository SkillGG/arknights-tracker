import React, { FC, useState } from "react";
import {
    DatabaseSettings,
    PageType,
    PastRecruitment,
    Settings,
    UserData,
} from "../utils";

import "./NavBar.css";
import ExportImportSetting from "./ExportImportSetting";
import SettingCheckbox from "./SettingCheckbox";
import { PityTrackerData } from "../Pity/utils";
import DatabaseSetting from "./DatabaseSetting";

interface NavBarProps {
    page: PageType;
    moveToPage(page: PageType): void;
    settings: Settings;
    historyData: PastRecruitment[];
    pityData: PityTrackerData;
    changeSetting(
        setting: keyof Settings,
        value: Settings[keyof Settings]
    ): void;
    importPity(is: PityTrackerData): void;
    importHistory(is: PastRecruitment[]): void;
    importSettings(is: Settings): void;
    getHistoryDataToSave(): Promise<string>;
    getPityDataToSave(): Promise<string>;
    logIn(s: DatabaseSettings, d?: UserData): void;
    logOut(): void;
}

export type ExportData = {
    extension: "atd" | "txt";
    data: { settings: boolean; pity: boolean; history: boolean };
} | null;

const NavBar: FC<NavBarProps> = ({
    page,
    moveToPage,
    settings,
    getHistoryDataToSave,
    historyData,
    getPityDataToSave,
    pityData,
    changeSetting,
    logIn,
    logOut,
    importHistory,
    importPity,
    importSettings,
}) => {
    const [settingsModal, setSettingsModal] = useState(false);

    const [eximport, setEximport] = useState<ExportData>(null);

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
                {page !== "stats" && (
                    <button
                        className="navSwitch"
                        onClick={() => moveToPage("stats")}
                    >
                        Stats
                    </button>
                )}
                <button
                    className="navSwitch"
                    onClick={() => {
                        setSettingsModal(true);
                        setEximport(null);
                    }}
                >
                    Settings
                </button>
            </div>
            <div
                className={`settings${settingsModal ? " shown" : ""}`}
                onClick={(e) => {
                    const target = e.target as Element;
                    if (target.className.includes("shown")) {
                        setSettingsModal(false);
                        setEximport(null);
                    }
                }}
            >
                <div className="settings-content">
                    <fieldset>
                        <legend>Recruitment Settings</legend>
                        <SettingCheckbox
                            label="Track Recruitment History"
                            id="save-history"
                            checked={settings.saveHistory}
                            toggleSetting={() =>
                                changeSetting(
                                    "saveHistory",
                                    !settings.saveHistory
                                )
                            }
                        />
                        <SettingCheckbox
                            label="Click character to open it's database entry"
                            id="save-outside"
                            disabled={settings.clickToSelectOutcome}
                            checked={settings.characterDatabase}
                            toggleSetting={() =>
                                changeSetting(
                                    "characterDatabase",
                                    !settings.characterDatabase
                                )
                            }
                        />
                        <SettingCheckbox
                            label="Click character to select it as outcome"
                            disabled={
                                settings.characterDatabase ||
                                !settings.saveHistory
                            }
                            id="save-outcome"
                            checked={settings.clickToSelectOutcome}
                            toggleSetting={() =>
                                changeSetting(
                                    "clickToSelectOutcome",
                                    !settings.clickToSelectOutcome
                                )
                            }
                        />
                        <SettingCheckbox
                            label="Allow selecting combinations without any characters"
                            checked={settings.allowCombinations}
                            toggleSetting={() =>
                                changeSetting(
                                    "allowCombinations",
                                    !settings.allowCombinations
                                )
                            }
                            id="allow-combinations"
                            helpIcon={{ className: "setting-help" }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Data settings</legend>
                        <fieldset>
                            <legend>Database</legend>
                            <DatabaseSetting
                                settings={settings}
                                setDatabaseData={(s, d) => {
                                    logIn(s, d);
                                }}
                                logOut={logOut}
                                dbdata={{
                                    history: historyData,
                                    pity: pityData,
                                }}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>Local</legend>
                            <div className="export-btns">
                                <ExportImportSetting
                                    exportData={eximport}
                                    setData={setEximport}
                                    clickedImport={() => {
                                        const fileAgent =
                                            document.createElement("input");
                                        fileAgent.accept = ".atd,.txt";
                                        fileAgent.type = "file";
                                        fileAgent.click();
                                        fileAgent.onchange = async (e) => {
                                            const target =
                                                e.target as HTMLInputElement;
                                            if (
                                                target.files &&
                                                target.files[0]
                                            ) {
                                                const [found, his, pity, sets] =
                                                    /(?:h:([.\S\s]*?))?(?:\n\n)?(?:p:([\s\S]*?))?(?:\n\n)?(?:s:([\s\S]*?))?\n\n/.exec(
                                                        await target.files[0].text()
                                                    ) || [null, null, null];

                                                if (!found) return;
                                                if (his) {
                                                    // import his
                                                    try {
                                                        const history =
                                                            JSON.parse(
                                                                his
                                                            ) as PastRecruitment[];
                                                        if (history) {
                                                            importHistory(
                                                                history
                                                            );
                                                        }
                                                    } catch (err) {
                                                        // TODO: Handle import error
                                                    }
                                                }
                                                if (pity) {
                                                    // import pity
                                                    try {
                                                        const pityD =
                                                            JSON.parse(
                                                                pity
                                                            ) as PityTrackerData;
                                                        if (pityD) {
                                                            importPity(pityD);
                                                        }
                                                    } catch (err) {
                                                        // TODO: Handle import error
                                                    }
                                                }

                                                if (sets) {
                                                    // import settings
                                                    try {
                                                        const settings =
                                                            JSON.parse(
                                                                sets
                                                            ) as Settings;
                                                        if (settings) {
                                                            importSettings(
                                                                settings
                                                            );
                                                        }
                                                    } catch (err) {
                                                        // TODO: Handle import error
                                                    }
                                                }
                                            }
                                        };
                                        setEximport(null);
                                    }}
                                    clickedExport={async () => {
                                        if (eximport) {
                                            const { data, extension } =
                                                eximport;
                                            const historyData = data.history
                                                ? await getHistoryDataToSave()
                                                : "";
                                            const pityData = data.pity
                                                ? await getPityDataToSave()
                                                : "";
                                            const settingsData = data.settings
                                                ? JSON.stringify(
                                                      settings,
                                                      undefined,
                                                      4
                                                  )
                                                : "";
                                            const saveData = new Blob(
                                                [
                                                    `h:${
                                                        historyData + "\n\n"
                                                    }p:${
                                                        pityData + "\n\n"
                                                    }s:${settingsData}\n\n`,
                                                ],
                                                {
                                                    type: "application/arknights-tracker-data+xjson",
                                                }
                                            );
                                            const downloadAgent =
                                                document.createElement("a");
                                            downloadAgent.download =
                                                "data." + extension;
                                            downloadAgent.href =
                                                URL.createObjectURL(saveData);
                                            downloadAgent.click();
                                            setEximport(null);
                                        }
                                    }}
                                />
                            </div>
                        </fieldset>
                    </fieldset>
                </div>
            </div>
        </>
    );
};

export default NavBar;
