import React, { FC, useEffect, useState } from "react";

interface PityTrackerProps {
    settings: Settings;
}

type PityTrackerData = {
    standard: number;
    special: Map<string, number>;
};

import "./pity.css";
import Banner from "./PityTrackerWindow";
import { Settings } from "./../utils";
import StorageIDS from "./../localStorageIDs.json";

const PityTracker: FC<PityTrackerProps> = () => {
    const [pityTracker, setPityTracker] = useState<PityTrackerData>({
        standard: parseInt(
            localStorage.getItem(StorageIDS.pity.standard) || "0"
        ),
        special: new Map([]),
    });

    type BannerData = {
        id: string;
        name: string;
        f10: boolean;
        img?: string;
    };

    const [standardBanners, setStandardBanners] = useState<BannerData[]>([]);
    const [specialBanners, setSpecialBanners] = useState<BannerData[]>([]);

    const BannerDataFromString = (s: string): BannerData | null => {
        const data =
            /^\{\s*(!)?\s*(.*?)\s*:\s*"(.*?)"(?:\s*:\s*(.*?))?\s*\}$/.exec(
                s.trim()
            );
        if (!data || !data[2] || !data[3]) {
            return null;
        } else {
            return {
                id: data[2],
                name: data[3],
                img: data[4].trim(),
                f10: !!data[1],
            };
        }
    };

    useEffect(() => {
        let set = true;
        (async () => {
            const specialID = await fetch("./specialID", {
                cache: "no-store",
            }).then((r) => r.text());
            const standardID = await fetch("./standardID", {
                cache: "no-store",
            }).then((r) => r.text());
            if (specialID && standardID && set) {
                const standards = standardID
                    .split(",")
                    .reduce<BannerData[]>((p, n) => {
                        const b = BannerDataFromString(n);
                        return b ? [...p, b] : p;
                    }, []);
                const specials = specialID
                    .split(",")
                    .reduce<BannerData[]>((p, n) => {
                        const b = BannerDataFromString(n);
                        return b ? [...p, b] : p;
                    }, []);
                // console.log(standards, specials);
                setStandardBanners(standards);
                setSpecialBanners(specials);
                setPityTracker((p) => ({
                    ...p,
                    special: new Map([
                        ...p.special,
                        ...specials.map((banner) => {
                            const ret: [string, number] = [
                                banner.id,
                                parseInt(
                                    localStorage.getItem(
                                        `${banner.id}${StorageIDS.pity.countSuffix}`
                                    ) || "0"
                                ),
                            ];
                            return ret;
                        }),
                    ]),
                }));
            }
        })();
        return () => {
            set = false;
        };
    }, []);

    useEffect(() => {
        [...pityTracker.special].forEach((banner) => {
            localStorage.setItem(
                `${banner[0]}${StorageIDS.pity.countSuffix}`,
                `${banner[1]}`
            );
        });
    }, [pityTracker.special]);

    useEffect(() => {
        localStorage.setItem(
            StorageIDS.pity.standard,
            `${pityTracker.standard}`
        );
    }, [pityTracker.standard]);

    return (
        <div id="pityTracker">
            <>
                {standardBanners.map((banner) => {
                    return (
                        <Banner
                            key={`${banner.id}`}
                            name={banner.name}
                            id={banner.id}
                            noF10={banner.f10}
                            addCount={() => {
                                setPityTracker((p) => ({
                                    ...p,
                                    standard: p.standard + 1,
                                }));
                            }}
                            resetCount={function (): void {
                                setPityTracker((p) => ({ ...p, standard: 0 }));
                            }}
                            count={pityTracker.standard}
                            img={banner.img}
                        />
                    );
                })}
                {specialBanners.map((banner) => {
                    const hasCount = pityTracker.special.get(banner.id);
                    if (hasCount === undefined) {
                        setPityTracker((p) => {
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
                                    setPityTracker((p) => {
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
                                    setPityTracker((p) => {
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
