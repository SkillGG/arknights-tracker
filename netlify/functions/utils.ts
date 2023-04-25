import { PastRecruitment } from "../../src/utils";

export const PastRecruitmentsToAkHistory = (
    history: PastRecruitment[] | undefined
) => {
    return history
        ? {
              recruitments: {
                  set: [
                      ...history.map((n) => ({
                          ...n,
                          outcome: n.outcome || null,
                      })),
                  ],
              },
          }
        : undefined;
};
