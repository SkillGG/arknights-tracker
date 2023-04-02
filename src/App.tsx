import React, { FC, useState } from "react";
import "./App.css";
import PityTracker from "./Pity/PityTracker";
import {
    ArkData,
    DEFAULT_SETTINGS,
    PageType,
    parseLocation,
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

import NavBar from "./NavBar";
import RecruitmentPage from "./Recruitment/Recruitment";

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
    window.onload = () => {
        const locationData = parseLocation();
        setPage(locationData.path);
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

    return (
        <>
            <title>
                {page === "recruit"
                    ? "Recruitment Arknights"
                    : page === "pity"
                    ? "Pity Tracker Arknights"
                    : "Recruitment History Arknights"}
            </title>
            <NavBar
                page={page}
                moveToPage={moveToPage}
                changeSetting={changeSetting}
                settings={settings}
            />
            {page === "pity" ? (
                <PityTracker settings={settings} />
            ) : (
                <RecruitmentPage
                    characters={characters}
                    settings={settings}
                    page={page}
                    popped={popState}
                />
            )}
        </>
    );
};

export default App;
