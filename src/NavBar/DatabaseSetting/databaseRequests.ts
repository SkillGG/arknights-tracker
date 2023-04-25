import { isResultError } from "../../../netlify/functions/utils";
import { AkPity, AkSettings } from "../../../prisma/prismaClient";
import { PityTrackerData } from "../../Pity/utils";
import { DEF_SETTINGS, PastRecruitment, Settings, UserData } from "../../utils";
import {
    exportToRequest,
    exportToResult,
} from "./../../../netlify/functions/exportTo";
import {
    exportToGuestRequest,
    exportToGuestResult,
} from "./../../../netlify/functions/exportToGuest";
import { importFromResult } from "./../../../netlify/functions/importFrom";

export type LoggedInData = {
    id: string;
} & UserData;

export const Login_Export_Guest = async (
    settings: Settings,
    history: PastRecruitment[],
    pity: PityTrackerData
): Promise<LoggedInData | null> => {
    const sendData: exportToGuestRequest = {
        settings,
        history,
        pity: { special: [...pity.special], standard: pity.standard },
    };
    const userData: exportToGuestResult | string | null = await fetch(
        "/.netlify/functions/exportToGuest",
        {
            body: JSON.stringify(sendData),
        }
    ).then((r) => (r.status ? r.json() : r.text() || null));

    if (userData && typeof userData === "object")
        return { history, id: userData.id, pity, settings };
    else {
        if (userData) console.warn(userData);
        return null;
    }
};

export const Login_Export = async (
    username: string,
    password: string,
    settings: Settings,
    history: PastRecruitment[],
    pity: PityTrackerData
): Promise<LoggedInData | null> => {
    const sendData: exportToRequest = {
        username,
        pass: password,
        settings,
        history,
        pity: { special: [...pity.special], standard: pity.standard },
    };
    const userData: exportToResult | string | null = await fetch(
        "/.netlify/functions/exportTo",
        {
            body: JSON.stringify(sendData),
        }
    ).then((r) => (r.status ? r.json() : null));

    if (userData && typeof userData === "object")
        return { history, id: userData.id, pity, settings };
    else {
        if (userData) console.warn(userData);
        return null;
    }
};

export const Login_Import = async (
    username: string,
    password: string
): Promise<LoggedInData | null> => {
    const sendData = { username, pass: password };

    const userData: importFromResult | null = await fetch(
        "/.netlify/functions/importFrom",
        {
            body: JSON.stringify(sendData),
        }
    ).then((r) => {
        if (r.status === 200) return r.json();
        else return null;
    });

    const StandardizePity = (ap: AkPity): PityTrackerData => {
        return {
            ...ap,
            special: new Map<string, number>(ap.special as [string, number][]),
        };
    };

    const StandardizeSettings = (jv: AkSettings | null): Settings => {
        return jv ? { ...jv, databaseSettings: null } : DEF_SETTINGS;
    };

    if (userData && typeof userData === "object" && !isResultError(userData))
        return {
            history: userData.akdata.history as PastRecruitment[],
            id: userData.id,
            pity: StandardizePity(userData.akdata.pity),
            settings: StandardizeSettings(userData.akdata.settings),
        };
    else {
        if (userData) console.warn(userData.message);
        return null;
    }
};
