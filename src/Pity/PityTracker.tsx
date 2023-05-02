import React, { FC } from "react";
import "./pity.css";
import Banner from "./PityTrackerWindow";
import { Settings } from "./../utils";
import { PityData } from "./utils";

interface PityTrackerProps {
    settings: Settings;
    pityData: PityData;
    savePityDataToLS(pd: PityData): void;
}

const PityTracker: FC<PityTrackerProps> = ({ pityData, savePityDataToLS }) => {
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
                                savePityDataToLS({
                                    ...pityData,
                                    standard: pityData.standard + 1,
                                });
                            }}
                            resetCount={function (): void {
                                savePityDataToLS({ ...pityData, standard: 0 });
                            }}
                            count={pityData.standard}
                            img={banner.img}
                        />
                    );
                })}
                {pityData.banners.special.map((banner) => {
                    const hasCount = pityData.special.get(banner.id);
                    if (hasCount === undefined) {
                        savePityDataToLS({
                            ...pityData,
                            special: new Map([
                                ...pityData.special,
                                [banner.id, 0],
                            ]),
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
                                    savePityDataToLS({
                                        ...pityData,
                                        special: new Map([
                                            ...pityData.special,
                                            [
                                                banner.id,
                                                (pityData.special.get(
                                                    banner.id
                                                ) || 0) + 1,
                                            ],
                                        ]),
                                    });
                                }}
                                resetCount={function (): void {
                                    savePityDataToLS({
                                        ...pityData,
                                        special: new Map([
                                            ...pityData.special,
                                            [banner.id, 0],
                                        ]),
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
