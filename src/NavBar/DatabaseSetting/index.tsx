import React, { FC, useState } from "react";
import { DatabaseSettings, PastRecruitment, Settings } from "../../utils";
import { Login_Export } from "./databaseRequests";
import { PityTrackerData } from "../../Pity/utils";
interface DatabaseSettingProps {
    settings: Settings;
    setDatabaseData(
        s: DatabaseSettings,
        d: {
            history: PastRecruitment[];
            pity: PityTrackerData;
            settings: Settings;
        }
    ): void;
}

const DatabaseSetting: FC<DatabaseSettingProps> = ({
    settings,
    setDatabaseData,
}) => {
    const [loginData, setloginData] = useState<{
        stage: 1 | 2;
        data?: { username: string };
    } | null>(null);

    return (
        <>
            {settings.sendHistoryToDB ? (
                <></>
            ) : (
                <>
                    {loginData ? (
                        loginData.stage === 1 ? (
                            <>
                                <div className="dblogin">
                                    <div className="loginfields">
                                        <div className="loginfield">
                                            <input
                                                type="text"
                                                placeholder="Username"
                                            />
                                        </div>
                                        <div className="loginfield">
                                            <input
                                                type="text"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>
                                    <div className="loginbtns">
                                        <input
                                            onClick={async () => {
                                                const userdata =
                                                    await Login_Export(
                                                        "Guest",
                                                        "",
                                                        settings,
                                                        [],
                                                        {
                                                            special: new Map(),
                                                            standard: 0,
                                                        }
                                                    );
                                                if (userdata) {
                                                    setDatabaseData(
                                                        {
                                                            userId: userdata?.id,
                                                        },
                                                        { ...userdata }
                                                    );
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
                                        setloginData({ stage: 1 });
                                    }}
                                    value="Export"
                                />
                                <input
                                    type="button"
                                    className="settingsbtn dbimport"
                                    onClick={() => {
                                        setloginData({ stage: 1 });
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
