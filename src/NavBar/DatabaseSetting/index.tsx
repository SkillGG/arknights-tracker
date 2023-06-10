import React, { FC, useEffect, useRef, useState } from "react";
import { DatabaseSettings, PastRecruitment, Settings } from "../../utils";
import {
    LoggedData,
    Login_Export_Guest,
    Login_Import_Guest,
    isLoginError,
} from "./databaseRequests";
import { PityTrackerData } from "../../Pity/utils";
interface DatabaseSettingProps {
    settings: Settings;
    dbdata: { pity: PityTrackerData; history: PastRecruitment[] };
    setDatabaseData(
        s: DatabaseSettings,
        d?: {
            history: PastRecruitment[];
            pity: PityTrackerData;
            settings: Settings;
        }
    ): void;
    logOut(): void;
}

const DatabaseSetting: FC<DatabaseSettingProps> = ({
    settings,
    dbdata,
    setDatabaseData,
    logOut,
}) => {
    const [loginData, setloginData] = useState<{
        // Stage 1: Username/Password Filed
        // Stage 2: Logged in as
        stage: 1 | 2;
        isImport: boolean;
        data?: DatabaseSettings;
    } | null>(null);

    const [error, setError] = useState<string | null>(null);

    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    const usernameFieldRef = useRef<HTMLInputElement>(null);
    const passwordFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (settings && settings.databaseSettings)
            setloginData({
                isImport: false,
                stage: 2,
                data: settings.databaseSettings,
            });
    }, []);

    const [isGuestLogin, setIsGuestLogin] = useState(false);

    const guestRx = /(?:guest)?(\d{4})/.exec(loginData?.data?.username || "");
    const guest = guestRx ? { id: guestRx[1] } : null;

    const importToGuest = async (
        guestID: string
    ): Promise<DatabaseSettings | null> => {
        const login = guestID;
        if (login) {
            const userdata = await Login_Import_Guest(login);

            if (userdata) {
                if (isLoginError(userdata)) setError(userdata.err);
                else
                    return {
                        userId: userdata.id,
                        username: userdata.username,
                    };
            }
        } else {
            setError("Please provide guest ID!");
        }
        return null;
    };

    const exportToGuest = async (): Promise<LoggedData | null> => {
        const userdata = await Login_Export_Guest(
            settings,
            dbdata.history,
            dbdata.pity
        );
        if (userdata) {
            if (!isLoginError(userdata)) {
                return userdata;
            } else setError(userdata.err);
        }
        return null;
    };

    return (
        <>
            {loginData ? (
                loginData.stage === 1 ? (
                    <>
                        <div style={{ textAlign: "center" }}>
                            {loginData.isImport ? "Import from" : "Export to"}
                        </div>
                        <div className="dblogin">
                            <div className="loginfields">
                                <div className="loginfield">
                                    {isGuestLogin ? (
                                        <input
                                            ref={usernameFieldRef}
                                            type="text"
                                            onInput={() => {
                                                setError(null);
                                            }}
                                            placeholder="GuestID"
                                            pattern="\d{4}"
                                        />
                                    ) : (
                                        <input
                                            ref={usernameFieldRef}
                                            type="text"
                                            onInput={() => {
                                                setError(null);
                                            }}
                                            placeholder="Username"
                                        />
                                    )}
                                </div>
                                <div className="loginfield">
                                    <input
                                        disabled={isGuestLogin}
                                        ref={passwordFieldRef}
                                        type="password"
                                        onInput={() => {
                                            setError(null);
                                        }}
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="loginfield">
                                    <button
                                        data-guest={isGuestLogin ? "guest" : ""}
                                        type="button"
                                        onClick={() => {
                                            setIsGuestLogin(!isGuestLogin);
                                        }}
                                    >
                                        Guest {isGuestLogin ? "✔️" : "❌"}
                                    </button>
                                </div>
                            </div>
                            {error ? (
                                <div className="login-error">{error}</div>
                            ) : null}
                            <div className="loginbtns">
                                <input
                                    className="settingsbtn loginbtn"
                                    type="button"
                                    value="Login"
                                    disabled={buttonsDisabled}
                                    onClick={async () => {
                                        if (loginData.isImport) {
                                            if (isGuestLogin) {
                                                if (guest?.id) {
                                                    const guestData =
                                                        await importToGuest(
                                                            guest?.id
                                                        );
                                                    if (guestData)
                                                        setDatabaseData(
                                                            guestData
                                                        );
                                                    else
                                                        setError(
                                                            "Unknown server error!"
                                                        );
                                                } else {
                                                    setError("No ID provided!");
                                                }
                                            } else {
                                                // user import
                                            }
                                        } else {
                                            //
                                            if (isGuestLogin) {
                                                const guestData =
                                                    await exportToGuest();
                                                if (guestData) {
                                                    const guestSettings: DatabaseSettings =
                                                        {
                                                            userId: guestData.id,
                                                            username:
                                                                guestData.username,
                                                        };
                                                    setloginData(() => ({
                                                        isImport: false,
                                                        stage: 2,
                                                        data: guestSettings,
                                                    }));
                                                    setDatabaseData(
                                                        guestSettings,
                                                        {
                                                            ...guestData,
                                                        }
                                                    );
                                                }
                                            } else {
                                                // user export
                                            }
                                        }
                                    }}
                                />
                                <input
                                    className="settingsbtn loginbtn"
                                    type="button"
                                    value="Back"
                                    disabled={buttonsDisabled}
                                    onClick={async () => {
                                        setError(null);
                                        setloginData(null);
                                        setButtonsDisabled(false);
                                        setIsGuestLogin(false);
                                    }}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        Logged in as{" "}
                        {guest ? `Guest#${guest.id}` : loginData.data?.username}{" "}
                        <button
                            onClick={() => {
                                setloginData(null);
                                logOut();
                                setButtonsDisabled(false);
                            }}
                        >
                            Logout
                        </button>
                    </>
                )
            ) : (
                <>
                    <div className="dblogin">
                        <input
                            type="button"
                            className="settingsbtn dbexport"
                            onClick={() => {
                                setloginData({
                                    stage: 1,
                                    isImport: false,
                                });
                                setButtonsDisabled(false);
                            }}
                            value="Export"
                        />
                        <input
                            type="button"
                            className="settingsbtn dbimport"
                            onClick={() => {
                                setloginData({
                                    stage: 1,
                                    isImport: true,
                                });
                                setButtonsDisabled(false);
                            }}
                            value="Import"
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default DatabaseSetting;
