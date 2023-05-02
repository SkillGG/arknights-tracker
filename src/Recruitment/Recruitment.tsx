import React, { FunctionComponent, useEffect, useState } from "react";
import {
    ArkData,
    Filter,
    FullRecruitmentTags,
    getFilters,
    PageType,
    parseLocation,
    PastRecruitment,
    Settings,
    toggleTag,
} from "../utils";
import {
    HistoryUpdate,
    isFullHistoryUpdate,
    RecHis,
} from "./History/rechis.util";
import CharacterShow from "./Picker/CharacterShow";
import FilterPicker from "./Picker/FilterPicker";

import StorageIDS from "./../localStorageIDs.json";
import RecruitmentHistory from "./History/RecruitmentHistory";

interface RecruitmentPageProps {
    /**
     * All character data
     */
    characters: ArkData[];
    /**
     * Flag which page to show
     */
    page: Exclude<PageType, "pity">;
    /**
     * Page settings
     */
    settings: Settings;
    /**
     * Flag that triggers onpopstate useEffect
     */
    popped: boolean;
    /**
     * History data
     */
    history: PastRecruitment[];
    saveRecHisToLS(rh: PastRecruitment[]): void;
}

export const getHistoryDataFromStorage = () => {
    return RecHis.decompress(
        localStorage.getItem(StorageIDS.recruitment.history) || "[]"
    ).filter((z) => z);
};

const RecruitmentPage: FunctionComponent<RecruitmentPageProps> = ({
    characters,
    page,
    settings,
    popped,
    history: recHistory,
    saveRecHisToLS,
}) => {
    const [tag, setTag] = useState(true);

    /**
     * Chosen filters
     */
    const [filters, setFilters] = useState<Filter[]>([]);

    /**
     * Filters that have IDs
     *
     * Non-id filters hide 6* and timer-based operator (Robot, Starter etc.)
     */
    const namedFilters = filters.filter((f) => f.id);

    const [firstLoad, setFirstLoad] = useState(false);

    const [time, setTime] = useState(9);

    useEffect(() => {
        const locationData = parseLocation();
        if (locationData.path === "recruit") {
            selectMany(locationData.filters);
            setTime(locationData.time);
        }
        setFirstLoad(true);
    }, [page]);
    /**
     * window.onpopstate
     */
    useEffect(() => {
        const locationData = parseLocation();
        if (locationData.path === "recruit") {
            selectMany(locationData.filters);
        }
    }, [popped]);

    const refreshURLHistory = () => {
        history.pushState(
            "",
            "",
            `?time=${time}&filter=${namedFilters.map((f) => f.id).join(",")}`
        );
    };

    const isSelected = (s: string) => {
        return !!namedFilters.find((f) => f.id === s);
    };
    const tooMany = (s: string[]) => s.length > 5;
    const select = (s: string) => {
        const curr = toggleTag(
            namedFilters.map((f) => f.id),
            s
        );
        if (tooMany(curr)) return;
        setFilters(getFilters(curr, time));
    };
    const selectMany = (sarr: string[]) => {
        const checked = sarr.slice(0, 5);
        setFilters(getFilters(checked, time));
    };

    useEffect(() => {
        if (filters.length > 0) {
            setFilters(
                getFilters(
                    namedFilters.map((r) => r.id),
                    time
                )
            );
        }
    }, [time]);

    useEffect(() => {
        const locationData = parseLocation();
        if (locationData.path !== "recruit") return;
        if (firstLoad || filters.length > 0) {
            if (
                locationData.filters.length !== namedFilters.length ||
                locationData.time !== time
            )
                refreshURLHistory();
        }
    }, [filters, time]);

    const saveHistoryChangeToLS = (o: HistoryUpdate) => {
        let srh = [...recHistory];
        if (!isFullHistoryUpdate(o)) {
            const index = recHistory.findIndex((rh) => rh.date === o.d);
            if (index !== -1) {
                srh[index] = o.f(srh[index]);
            }
        } else if (isFullHistoryUpdate(o)) {
            srh = o.f(srh);
        }
        saveRecHisToLS(srh);
    };

    const addToRecHistory = (
        ids: FullRecruitmentTags,
        picked: string[],
        selected?: ArkData
    ) => {
        saveHistoryChangeToLS({
            f: (rh: PastRecruitment[]) => {
                rh.push({
                    tags: ids.filter((f) => !!f),
                    date: new Date().getTime(),
                    outcome: selected ? selected.name : undefined,
                    picked,
                    time,
                });
                return rh;
            },
        });
    };

    const tagsRefreshed = () => {
        addToRecHistory(
            namedFilters.map((r) => r.id),
            []
        );
        setFilters([]);
    };

    return (
        <>
            {page === "recruit" && (
                <>
                    <FilterPicker
                        select={select}
                        isSelected={isSelected}
                        unselectAll={() => setFilters([])}
                        tagsRefreshed={tagsRefreshed}
                        tag={tag}
                        setTag={setTag}
                        settings={settings}
                        time={time}
                        setTime={setTime}
                    />
                    <CharacterShow
                        characters={characters}
                        filters={filters}
                        recruitmentTime={time}
                        showTag={tag}
                        selectRecruitment={(
                            s: string[],
                            p: string[],
                            selected?: ArkData
                        ) => {
                            addToRecHistory(s, p, selected);
                            setFilters([]);
                        }}
                        settings={settings}
                    />
                </>
            )}
            {page === "recHis" && (
                <>
                    <RecruitmentHistory
                        settings={settings}
                        characters={characters}
                        recHistory={recHistory}
                        toggleStrikeOut={(d, t) => {
                            saveHistoryChangeToLS({
                                d,
                                f: (rh: PastRecruitment) => {
                                    const tagIndex = rh.picked.findIndex(
                                        (tag) => tag === t
                                    );
                                    rh.picked[tagIndex] =
                                        t.charAt(0) === "-"
                                            ? t.substring(1)
                                            : `-${t}`;
                                    return rh;
                                },
                            });
                        }}
                        setOutcome={(d, o) => {
                            saveHistoryChangeToLS({
                                d,
                                f: (rh: PastRecruitment) => {
                                    rh.outcome = o.name;
                                    return rh;
                                },
                            });
                        }}
                        removeFromHistory={(d) => {
                            saveHistoryChangeToLS({
                                d,
                                f: (rh: PastRecruitment) => {
                                    rh = {
                                        date: 0,
                                        picked: [],
                                        tags: [],
                                        time: 9,
                                    };
                                    return rh;
                                },
                            });
                        }}
                    />
                </>
            )}
        </>
    );
};

export default RecruitmentPage;
