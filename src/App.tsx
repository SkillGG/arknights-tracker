import React, { FC, useState } from "react";
import "./App.css";
import PityTracker from "./Pity/PityTracker";
import {
    ArkData,
    DEFAULT_SETTINGS,
    PageType,
    parseLocation,
    PastRecruitment,
    Settings,
    ShallowCopy,
} from "./utils";

/**
 * All characters data from json (untyped)
 */
import untypedChars from "./operators.json";
/**
 * All localStorage IDs
 */
import StorageIDS from "./localStorageIDs.json";

import NavBar from "./NavBar/NavBar";
import RecruitmentPage, {
    getHistoryDataFromStorage,
} from "./Recruitment/Recruitment";
import { RecHis } from "./Recruitment/History/rechis.util";
import {
    BannerData,
    BannerDataFromString,
    PityData,
    getPityDataFromStorage,
} from "./Pity/utils";
import StatsPage from "./StatsPage";

const App: FC<object> = () => {
    /**
     * All character data from json (typed)
     */
    const characters: ArkData[] = untypedChars;

    /**
     * Switch what page are we on
     */
    const [page, setPage] = useState<PageType>("recruit");

    /**
     * Site settings
     */
    const [settings, setSettings] = useState<Settings>(
        JSON.parse(
            localStorage.getItem(StorageIDS.settings) || DEFAULT_SETTINGS
        )
    );

    /**
     * Flag that changes when onpopstate has bee triggered to relay that information to recruitment filters to update based on url
     */
    const [popState, setPopState] = useState(false);

    /**
     * Changes a given setting
     * @param setting Setting to change
     * @param value new value for a setting
     */
    const changeSetting = (
        setting: keyof Settings,
        value: Settings[keyof Settings]
    ) => {
        settings[setting] = value;
        localStorage.setItem(StorageIDS.settings, JSON.stringify(settings));
        setSettings(ShallowCopy<Settings>(settings));
    };

    /**
     * Set page based on url
     */
    window.onload = async () => {
        const locationData = parseLocation();
        setPage(locationData.path);
        const specialID = await fetch("./specialID", {
            cache: "no-store",
        }).then((r) => r.text());
        const standardID = await fetch("./standardID", {
            cache: "no-store",
        }).then((r) => r.text());
        if (specialID && standardID) {
            const standards = standardID
                .split(",")
                .reduce<BannerData[]>((p, n) => {
                    const b = BannerDataFromString(n);
                    return b ? [...p, b] : p;
                }, []);
            const specials = specialID
                .split(",")
                .reduce<BannerData[]>((p, n) => {
                    const b = BannerDataFromString(n);
                    return b ? [...p, b] : p;
                }, []);
            // console.log(standards, specials);
            setPityData((p) =>
                p
                    ? {
                          ...p,
                          banners: { standard: standards, special: specials },
                          special: new Map([
                              ...p.special,
                              ...specials.map((banner) => {
                                  const ret: [string, number] = [
                                      banner.id,
                                      parseInt(
                                          localStorage.getItem(
                                              `${banner.id}${StorageIDS.pity.countSuffix}`
                                          ) || "0"
                                      ),
                                  ];
                                  return ret;
                              }),
                          ]),
                      }
                    : p
            );
        }
    };

    /**
     * Set page on back button
     */
    window.onpopstate = () => {
        const locationData = parseLocation();
        setPage(locationData.path);
        setPopState((popState) => !popState);
    };

    /**
     * Change page
     * @param page What page to change to
     */
    const moveToPage = (page: PageType) => {
        history.pushState(null, "", page);
        setPage(page);
    };

    const [recHistory, setRecHistory] = useState<PastRecruitment[]>(
        getHistoryDataFromStorage()
    );

    const [pityData, setPityData] = useState<PityData>({
        standard: parseInt(
            localStorage.getItem(StorageIDS.pity.standard) || "0"
        ),
        special: new Map([]),
        banners: {
            special: [],
            standard: [],
        },
    });

    return (
        <>
            <title>
                {page === "recruit"
                    ? "Recruitment Arknights"
                    : page === "pity"
                    ? "Pity Tracker Arknights"
                    : page === "stats"
                    ? "Recruitment Statistics"
                    : "Recruitment History Arknights"}
            </title>
            <NavBar
                page={page}
                moveToPage={moveToPage}
                changeSetting={changeSetting}
                settings={settings}
                getPityDataToSave={async () => {
                    return JSON.stringify(
                        await getPityDataFromStorage(),
                        undefined,
                        4
                    );
                }}
                getHistoryDataToSave={async () =>
                    JSON.stringify(recHistory, undefined, 4)
                }
                importPity={(ptd) => {
                    //
                    localStorage.setItem(
                        StorageIDS.pity.standard,
                        `${ptd.standard}`
                    );
                    [...ptd.special].forEach(([id, count]) => {
                        localStorage.setItem(
                            `${id}${StorageIDS.pity.countSuffix}`,
                            `${count}`
                        );
                    });
                }}
                importHistory={(rhd) => {
                    localStorage.setItem(
                        StorageIDS.recruitment.history,
                        RecHis.compress(rhd)
                    );
                    setRecHistory(rhd);
                }}
                importSettings={(std) => {
                    setSettings(std);
                    localStorage.setItem(
                        StorageIDS.settings,
                        JSON.stringify(std)
                    );
                }}
            />
            {page === "pity" ? (
                <PityTracker
                    settings={settings}
                    pityData={pityData}
                    setPityData={setPityData}
                />
            ) : page !== "stats" ? (
                <RecruitmentPage
                    history={recHistory}
                    setHistory={setRecHistory}
                    characters={characters}
                    settings={settings}
                    page={page}
                    popped={popState}
                />
            ) : (
                <StatsPage historyData={recHistory} pityData={pityData} />
            )}
        </>
    );
};

export default App;
