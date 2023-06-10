import { Handler } from "@netlify/functions";

import { PrismaClient, akdata, users } from "../../prisma/prismaClient";
import { DEF_SETTINGS, PastRecruitment } from "../../src/utils";
import { ResultError, resultErrorWithMessage } from "./utils";

export type exportToGuestRequest = Pick<akdata, "pity" | "settings"> & {
    history?: PastRecruitment[];
};

export type exportToGuestResult =
    | (Pick<users, "id" | "username"> & {
          akdata: Pick<akdata, "history" | "pity" | "settings"> | null;
      })
    | ResultError;

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return resultErrorWithMessage("Invalid request");
    try {
        const data: exportToGuestRequest = JSON.parse(ev.body);
        await prismaClient.$connect();

        let guestCreateAttemptCount = 0;
        const MAXCREATEATTEMPTS = 5;

        let userExists;

        const guestData = { username: "", pass: "GuestPass" };

        do {
            guestData.username =
                "guest" +
                Math.floor(Math.random() * 1000)
                    .toString()
                    .padStart(4, "0"); // TODO: better guest randomizer

            userExists = null;
            userExists = await prismaClient.users.findFirst({
                where: guestData,
            });
            guestCreateAttemptCount++;
        } while (userExists || guestCreateAttemptCount > MAXCREATEATTEMPTS);

        if (userExists) {
            await prismaClient.$disconnect();
            throw "Too many guests!";
        } else {
            const userData: exportToGuestResult =
                await prismaClient.users.create({
                    data: {
                        username: guestData.username,
                        pass: guestData.pass,
                        akdata: {
                            create: {
                                history: data.history || [],
                                pity: data.pity || { standard: 0, special: {} },
                                settings: data.settings || DEF_SETTINGS,
                            },
                        },
                    },
                    select: {
                        akdata: {
                            select: {
                                history: true,
                                pity: true,
                                settings: true,
                            },
                        },
                        id: true,
                        username: true,
                        pass: false,
                    },
                });
            await prismaClient.$disconnect();
            return {
                statusCode: 200,
                body: JSON.stringify(userData),
            };
        }
    } catch (err) {
        await prismaClient.$disconnect();
        if (typeof err === "string") return resultErrorWithMessage(err);
        else {
            return resultErrorWithMessage(
                "Unexpected server error" + (err as Error).message
            );
        }
    }
};

export { handler };
