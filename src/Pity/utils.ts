import StorageIDS from "./../localStorageIDs.json";

export type PityTrackerData = {
    standard: number;
    special: Map<string, number>;
};

export type BannerData = {
    id: string;
    name: string;
    f10: boolean;
    img?: string;
};

export const BannerDataFromString = (s: string): BannerData | null => {
    const data = /^\{\s*(!)?\s*(.*?)\s*:\s*"(.*?)"(?:\s*:\s*(.*?))?\s*\}$/.exec(
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

export const getPityDataFromStorage = async () => {
    const specialID = await fetch("./specialID", {
        cache: "no-store",
    }).then((r) => r.text());
    const specials = specialID.split(",").reduce<BannerData[]>((p, n) => {
        const b = BannerDataFromString(n);
        return b ? [...p, b] : p;
    }, []);
    const pityTracker: PityTrackerData = {
        special: new Map([
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
        standard: parseInt(
            localStorage.getItem(StorageIDS.pity.standard) || "0"
        ),
    };
    return pityTracker;
};
