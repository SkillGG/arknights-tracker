import React, { Dispatch, FC, SetStateAction } from "react";
import { ExportData } from "../NavBar";
import SettingCheckbox from "../SettingCheckbox";

interface EIProps {
    exportData: ExportData;
    setData: Dispatch<SetStateAction<ExportData>>;
    clickedExport(): void;
    clickedImport(): void;
}

const ExportImportSetting: FC<EIProps> = ({
    exportData,
    setData,
    clickedExport,
    clickedImport,
}) => {
    return (
        <>
            {!exportData ? (
                <>
                    <button
                        className="export-btn settingsbtn"
                        onClick={() => {
                            setData({
                                data: {
                                    history: true,
                                    pity: true,
                                    settings: true,
                                },
                                extension: "atd",
                            });
                        }}
                    >
                        Export
                    </button>
                    <button
                        className="import-btn settingsbtn"
                        onClick={clickedImport}
                    >
                        Import
                    </button>
                </>
            ) : (
                <>
                    <div className="export-extension">
                        <span>Extension:</span>
                        <div>
                            <label htmlFor="expext_adt">.adt</label>
                            <input
                                type="radio"
                                id="expext_adt"
                                name="expext"
                                checked={exportData.extension === "atd"}
                                onChange={() => {
                                    setData((p) =>
                                        p ? { ...p, extension: "atd" } : p
                                    );
                                }}
                            />
                            <br />
                            <label htmlFor="expext_txt">.txt</label>
                            <input
                                type="radio"
                                id="expext_txt"
                                name="expext"
                                checked={exportData.extension === "txt"}
                                onChange={() => {
                                    setData((p) =>
                                        p ? { ...p, extension: "txt" } : p
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <div className="export-extension">
                        <span>Data to export:</span>
                        <div>
                            <SettingCheckbox
                                id="expext_data"
                                checked={exportData.data.history}
                                toggleSetting={() => {
                                    setData((p) =>
                                        p
                                            ? {
                                                  ...p,
                                                  data: {
                                                      ...p.data,
                                                      history:
                                                          !exportData.data
                                                              .history,
                                                  },
                                              }
                                            : p
                                    );
                                }}
                                label={"History"}
                            />
                            <SettingCheckbox
                                divStyle={{ marginTop: "2px" }}
                                id="expext_pity"
                                label="Pity data"
                                checked={exportData.data.pity}
                                toggleSetting={() => {
                                    setData((p) =>
                                        p
                                            ? {
                                                  ...p,
                                                  data: {
                                                      ...p.data,
                                                      pity: !exportData.data
                                                          .pity,
                                                  },
                                              }
                                            : p
                                    );
                                }}
                            />
                            <SettingCheckbox
                                divStyle={{ marginTop: "2px" }}
                                label="Settings"
                                id="expext_settings"
                                checked={exportData.data.settings}
                                toggleSetting={() => {
                                    setData((p) =>
                                        p
                                            ? {
                                                  ...p,
                                                  data: {
                                                      ...p.data,
                                                      settings:
                                                          !exportData.data
                                                              .settings,
                                                  },
                                              }
                                            : p
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <div className="export-btns export-final-btns">
                        <button
                            className="export-btn settingsbtn"
                            onClick={clickedExport}
                        >
                            Export
                        </button>
                        <button
                            className="cancel-btn settingsbtn"
                            onClick={() => setData(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default ExportImportSetting;
