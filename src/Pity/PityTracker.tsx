import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import "./pity.css";
import Banner from "./PityTrackerWindow";
import { Settings } from "./../utils";
import StorageIDS from "./../localStorageIDs.json";
import { PityData } from "./utils";

interface PityTrackerProps {
    settings: Settings;
    pityData: PityData;
    setPityData: Dispatch<SetStateAction<PityData>>;
}

const PityTracker: FC<PityTrackerProps> = ({ pityData, setPityData }) => {
    useEffect(() => {
        [...pityData.special].forEach((banner) => {
            localStorage.setItem(
                `${banner[0]}${StorageIDS.pity.countSuffix}`,
                `${banner[1]}`
            );
        });
    }, [pityData.special]);

    useEffect(() => {
        localStorage.setItem(StorageIDS.pity.standard, `${pityData.standard}`);
    }, [pityData.standard]);

    return (
        <div id="pityTracker">
            <>
                {pityData.banners.standard.map((banner) => {
                    return (
                        <Banner
                            key={`${banner.id}`}
                            name={banner.name}
                            id={banner.id}
                            noF10={banner.f10}
                            addCount={() => {
                                setPityData((p) => ({
                                    ...p,
                                    standard: p.standard + 1,
                                }));
                            }}
                            resetCount={function (): void {
                                setPityData((p) => ({ ...p, standard: 0 }));
                            }}
                            count={pityData.standard}
                            img={banner.img}
                        />
                    );
                })}
                {pityData.banners.special.map((banner) => {
                    const hasCount = pityData.special.get(banner.id);
                    if (hasCount === undefined) {
                        setPityData((p) => {
                            return {
                                ...p,
                                special: new Map([
                                    ...p.special,
                                    [banner.id, 0],
                                ]),
                            };
                        });
                    }
                    return (
                        hasCount !== undefined && (
                            <Banner
                                key={`${banner.id}`}
                                name={banner.name}
                                id={banner.id}
                                noF10={banner.f10}
                                addCount={function (): void {
                                    setPityData((p) => {
                                        return {
                                            ...p,
                                            special: new Map([
                                                ...p.special,
                                                [
                                                    banner.id,
                                                    (p.special.get(banner.id) ||
                                                        0) + 1,
                                                ],
                                            ]),
                                        };
                                    });
                                }}
                                resetCount={function (): void {
                                    setPityData((p) => {
                                        return {
                                            ...p,
                                            special: new Map([
                                                ...p.special,
                                                [banner.id, 0],
                                            ]),
                                        };
                                    });
                                }}
                                img={banner.img}
                                count={hasCount}
                            />
                        )
                    );
                })}
            </>
        </div>
    );
};

export default PityTracker;
