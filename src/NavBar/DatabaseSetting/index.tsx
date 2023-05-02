import React, { FC, useEffect, useRef, useState } from "react";
import { DatabaseSettings, PastRecruitment, Settings } from "../../utils";
import { Login_Export_Guest, Login_Import_Guest } from "./databaseRequests";
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
}

const DatabaseSetting: FC<DatabaseSettingProps> = ({
    settings,
    dbdata,
    setDatabaseData,
}) => {
    const [loginData, setloginData] = useState<{
        // Stage 1: Username/Password Filed
        // Stage 2: Logged in as
        stage: 1 | 2;
        isImport: boolean;
        data?: DatabaseSettings;
    } | null>(null);

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

    return (
        <>
            {settings.sendHistoryToDB ? (
                <></>
            ) : (
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
                                                placeholder="Username"
                                            />
                                        </div>
                                        <div className="loginfield">
                                            <input
                                                ref={passwordFieldRef}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>
                                    <div className="loginbtns">
                                        <input
                                            onClick={async () => {
                                                if (loginData.isImport) {
                                                    const login =
                                                        usernameFieldRef.current
                                                            ?.value;
                                                    if (login) {
                                                        const userdata =
                                                            await Login_Import_Guest(
                                                                login
                                                            );
                                                        if (userdata) {
                                                            setDatabaseData({
                                                                userId: userdata.id,
                                                                username:
                                                                    userdata.username,
                                                            });
                                                        }
                                                    }
                                                } else {
                                                    const userdata =
                                                        await Login_Export_Guest(
                                                            settings,
                                                            dbdata.history,
                                                            dbdata.pity
                                                        );
                                                    if (userdata) {
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
                                            }}
                                            className="settingsbtn loginasguest"
                                            type="button"
                                            value="Guest"
                                        />
                                        <input
                                            className="settingsbtn loginbtn"
                                            type="button"
                                            value="Login"
                                            onClick={async () => {
                                                if (loginData.isImport) {
                                                    //
                                                } else {
                                                    //
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>Logged in as {loginData.data?.username}</>
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
                                    }}
                                    value="Import"
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default DatabaseSetting;
