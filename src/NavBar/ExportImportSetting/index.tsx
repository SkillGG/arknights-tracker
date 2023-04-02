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
                        className="export-btn"
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
                    <button className="import-btn" onClick={clickedImport}>
                        Import
                    </button>
                </>
            ) : (
                <>
                    <fieldset>
                        <legend>Export settings</legend>
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
                                <label htmlFor="expext_data">History</label>
                                <input
                                    type="checkbox"
                                    id="expext_data"
                                    checked={exportData.data.history}
                                    onChange={() => {
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
                                />
                                <br />
                                <label htmlFor="expext_pity">Pity data</label>
                                <input
                                    type="checkbox"
                                    id="expext_pity"
                                    checked={exportData.data.pity}
                                    onChange={() => {
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
                                <br />
                                <label htmlFor="expext_settings">
                                    Settings
                                </label>
                                <input
                                    type="checkbox"
                                    id="expext_settings"
                                    checked={exportData.data.settings}
                                    onChange={() => {
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
                                className="export-btn"
                                onClick={clickedExport}
                            >
                                Export
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => setData(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </fieldset>
                </>
            )}
        </>
    );
};

export default ExportImportSetting;
