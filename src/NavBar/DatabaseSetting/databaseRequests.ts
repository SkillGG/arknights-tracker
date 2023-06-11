import { ResultError, isResultError } from "../../../netlify/functions/utils";
import { AkPity, AkSettings } from "../../prismaClient";
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
import {
    importFromRequest,
    importFromResult,
} from "./../../../netlify/functions/importFrom";
import {
    importFromGuestRequest,
    importFromGuestResult,
} from "./../../../netlify/functions/importFromGuest";

const sendDataToServer = (path: string, data: object) => {
    return fetch(path, { method: "POST", body: JSON.stringify(data) });
};

export type LoginError = { err: string };

export const isLoginError = (d: LoggedInData): d is LoginError => {
    return !!(d as unknown as LoginError).err;
};

export type LoggedData = {
    id: string;
    username: string;
} & UserData;

export type LoggedInData = LoggedData | LoginError;

const getDataFromServer = async <REQT extends object, REST extends object>(
    path: string,
    data: REQT
): Promise<REST | null | ResultError> => {
    const response: REST | string | null = await sendDataToServer(
        path,
        data
    ).then((res) => {
        if (res.status === 200) {
            return res.json();
        } else {
            return res.text();
        }
    });

    if (typeof response === "string")
        return JSON.parse(response) as { message: string };
    else return response;
};

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

    const userData = await getDataFromServer<
        exportToGuestRequest,
        exportToGuestResult
    >("/.netlify/functions/exportToGuest", sendData);
    if (isResultError(userData)) {
        return { err: userData.message };
    } else if (userData) {
        return {
            history,
            id: userData.id,
            username: userData.username,
            pity,
            settings,
        };
    }
    return null;
};

export const Login_Export = async (
    username: string,
    password: string,
    settings: Settings,
    history: PastRecruitment[],
    pity: PityTrackerData,
    mergeType: exportToRequest["mergeType"]
): Promise<LoggedInData | null> => {
    const sendData: exportToRequest = {
        mergeType,
        username,
        pass: password,
        settings,
        history,
        pity: { special: [...pity.special], standard: pity.standard },
    };
    const userData = await getDataFromServer<exportToRequest, exportToResult>(
        "/.netlify/functions/exportTo",
        sendData
    );

    if (isResultError(userData)) {
        return { err: userData.message };
    } else if (userData) {
        return { history, id: userData.id, username, pity, settings };
    }
    return null;
};

const StandardizePity = (ap: AkPity): PityTrackerData => {
    return {
        ...ap,
        special: new Map<string, number>(ap.special as [string, number][]),
    };
};

const StandardizeSettings = (jv: AkSettings | null): Settings => {
    return jv ? { ...jv, databaseSettings: null } : DEF_SETTINGS;
};

export const Login_Import = async (
    username: string,
    password: string
): Promise<LoggedInData | null> => {
    const sendData = { username, pass: password };
    try {
        const userData = await getDataFromServer<
            importFromRequest,
            importFromResult
        >("/.netlify/functions/importFrom", sendData);
        if (isResultError(userData)) {
            throw userData.message;
        } else if (userData) {
            if (!userData.akdata) {
                throw "We recieved invalid data from server! Try again!";
            }
            return {
                history: userData.akdata.history as PastRecruitment[],
                id: userData.id,
                pity: StandardizePity(userData.akdata.pity),
                username,
                settings: StandardizeSettings(userData.akdata.settings),
            };
        }
        return null;
    } catch (err) {
        if (typeof err === "string") return { err };
        else {
            return { err: "Unknown server error!" };
        }
    }
};

export const Login_Import_Guest = async (
    id: string
): Promise<LoggedInData | null> => {
    const sendData = { username: id, pass: "" };

    const userData = await getDataFromServer<
        importFromGuestRequest,
        importFromGuestResult
    >("/.netlify/functions/importFromGuest", sendData);

    if (isResultError(userData)) {
        return { err: userData.message };
    } else if (userData) {
        if (!userData.akdata)
            throw "We recieved invalid data from server! Try again!";
        return {
            history: userData.akdata.history as PastRecruitment[],
            id: userData.id,
            pity: StandardizePity(userData.akdata.pity),
            settings: StandardizeSettings(userData.akdata.settings),
            username: sendData.username,
        };
    }
    return null;
};
