import { FunctionComponent, useEffect, useState } from "react";

interface PityTrackerProps {}

type PityTrackerData = {
  standard: number;
  special: Map<string, number>;
};

import "./pity.css";
import Banner from "./PityTrackerWindow";

const PityTracker: FunctionComponent<PityTrackerProps> = ({}) => {
  const [pityTracker, setPityTracker] = useState<PityTrackerData>({
    standard: parseInt(localStorage.getItem("standardPity") || "0"),
    special: new Map([]),
  });

  type BannerData = {
    id: string;
    name: string;
    img?: string;
  };

  const [standardBanners, setStandardBanners] = useState<BannerData[]>([]);
  const [specialBanners, setSpecialBanners] = useState<BannerData[]>([]);

  const BannerDataFromString = (s: string): BannerData | null => {
    const data = /^\{(.*?):\"(.*?)\"(?::(.*?))?}$/.exec(s);
    console.log(data);
    if (!data || !data[1] || !data[2]) {
      return null;
    } else {
      return { id: data[1], name: data[2], img: data[3] };
    }
  };

  useEffect(() => {
    let set = true;
    (async () => {
      const specialID = await fetch(
        "https://raw.githubusercontent.com/SkillGG/arknights-tracker/master/src/specialID",
        { cache: "no-cache" }
      ).then((r) => r.text());
      const standardID = await fetch(
        "https://raw.githubusercontent.com/SkillGG/arknights-tracker/master/src/standardID",
        { cache: "no-store" }
      ).then((r) => r.text());
      if (specialID && standardID && set) {
        const standards = standardID.split(",").reduce<BannerData[]>((p, n) => {
          const b = BannerDataFromString(n);
          return b ? [...p, b] : p;
        }, []);
        const specials = specialID.split(",").reduce<BannerData[]>((p, n) => {
          const b = BannerDataFromString(n);
          return b ? [...p, b] : p;
        }, []);
        console.log(standards, specials);
        setStandardBanners(standards);
        setSpecialBanners(specials);
        setPityTracker((p) => ({
          ...p,
          special: new Map([
            ...p.special,
            ...specials.map((banner) => {
              const ret: [string, number] = [
                banner.id,
                parseInt(localStorage.getItem(`${banner.id}_count`) || "0"),
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
      localStorage.setItem(`${banner[0]}_count`, `${banner[1]}`);
    });
  }, [pityTracker.special]);

  useEffect(() => {
    localStorage.setItem("standardPity", `${pityTracker.standard}`);
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
              noF10={false}
              addCount={() => {
                setPityTracker((p) => ({ ...p, standard: p.standard + 1 }));
              }}
              resetCount={function (): void {
                setPityTracker((p) => ({ ...p, standard: 0 }));
              }}
              count={pityTracker.standard}
            />
          );
        })}
        {specialBanners.map((banner) => {
          const hasCount = pityTracker.special.get(banner.id);
          if (hasCount === undefined) {
            setPityTracker((p) => {
              return { ...p, special: new Map([...p.special, [banner.id, 0]]) };
            });
          }
          return (
            hasCount !== undefined && (
              <Banner
                key={`${banner.id}`}
                name={banner.name}
                id={banner.id}
                noF10={true}
                addCount={function (): void {
                  setPityTracker((p) => {
                    return {
                      ...p,
                      special: new Map([
                        ...p.special,
                        [banner.id, (p.special.get(banner.id) || 0) + 1],
                      ]),
                    };
                  });
                }}
                resetCount={function (): void {
                  setPityTracker((p) => {
                    return {
                      ...p,
                      special: new Map([...p.special, [banner.id, 0]]),
                    };
                  });
                }}
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
