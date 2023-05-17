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

export type ResultError = { message: string };

export const resultErrorWithMessage = (message: string) => ({
    statusCode: 400,
    body: JSON.stringify({ message } as ResultError),
});

export const isResultError = (r: unknown): r is ResultError => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (r as any).message;
};
