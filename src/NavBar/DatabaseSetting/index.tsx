import React, { FC, useEffect, useRef, useState } from "react";
import { DatabaseSettings, PastRecruitment, Settings } from "../../utils";
import {
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

    const guestRx = /guest(\d{4})/.exec(loginData?.data?.username || "");
    const guest = guestRx ? { id: guestRx[1] } : null;

    return (
        <>
            {loginData ? (
                loginData.stage === 1 ? (
                    <>
                        <div style={{ textAlign: "center" }}>
                            {loginData.isImport ? "Import" : "Export"}
                        </div>
                        <div className="dblogin">
                            <div className="loginfields">
                                <div className="loginfield">
                                    <input
                                        ref={usernameFieldRef}
                                        type="text"
                                        onInput={() => {
                                            setError(null);
                                        }}
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="loginfield">
                                    <input
                                        ref={passwordFieldRef}
                                        type="password"
                                        onInput={() => {
                                            setError(null);
                                        }}
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            {error ? (
                                <div className="login-error">{error}</div>
                            ) : null}
                            <div className="loginbtns">
                                <input
                                    onClick={async () => {
                                        setButtonsDisabled(true);
                                        if (loginData.isImport) {
                                            const login =
                                                usernameFieldRef.current?.value;
                                            if (login) {
                                                const userdata =
                                                    await Login_Import_Guest(
                                                        login
                                                    );

                                                if (userdata) {
                                                    if (isLoginError(userdata))
                                                        setError(userdata.err);
                                                    else
                                                        setDatabaseData({
                                                            userId: userdata.id,
                                                            username:
                                                                userdata.username,
                                                        });
                                                }
                                            } else {
                                                setError(
                                                    "Please provide guest ID!"
                                                );
                                            }
                                        } else {
                                            const userdata =
                                                await Login_Export_Guest(
                                                    settings,
                                                    dbdata.history,
                                                    dbdata.pity
                                                );
                                            if (userdata) {
                                                if (isLoginError(userdata)) {
                                                    setError(userdata.err);
                                                } else {
                                                    setloginData(() => ({
                                                        isImport: false,
                                                        stage: 2,
                                                        data: {
                                                            userId: userdata.id,
                                                            username:
                                                                userdata.username,
                                                        },
                                                    }));
                                                    setDatabaseData(
                                                        {
                                                            userId: userdata.id,
                                                            username:
                                                                userdata.username,
                                                        },
                                                        { ...userdata }
                                                    );
                                                }
                                            }
                                        }
                                        setButtonsDisabled(false);
                                    }}
                                    className="settingsbtn loginasguest"
                                    type="button"
                                    disabled={buttonsDisabled}
                                    value="Guest"
                                />
                                <input
                                    className="settingsbtn loginbtn"
                                    type="button"
                                    value="Login"
                                    disabled={buttonsDisabled}
                                    onClick={async () => {
                                        if (loginData.isImport) {
                                            //
                                        } else {
                                            //
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
