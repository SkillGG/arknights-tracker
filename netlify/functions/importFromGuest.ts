import { Handler } from "@netlify/functions";

import { ResultError, resultErrorWithMessage } from "./utils";

import { PrismaClient, akdata, users } from "../../prisma/prismaClient";

export type importFromGuestRequest = Pick<users, "username">;

export type importFromGuestResult =
    | (Pick<users, "id"> & {
          akdata: Pick<akdata, "history" | "pity" | "settings"> | null;
      })
    | ResultError;

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return resultErrorWithMessage("Invalid request");
    try {
        const data: importFromGuestRequest = JSON.parse(ev.body);
        if (!data.username)
            return resultErrorWithMessage("No username provided!");

        const guestCode = /^(\d+)$/.exec(data.username);
        if (!guestCode)
            return resultErrorWithMessage("Incorrect guest ID format!");

        data.username = "guest" + guestCode[1];

        await prismaClient.$connect();

        const userData: importFromGuestResult | null =
            await prismaClient.users.findFirst({
                where: {
                    username: "guest" + guestCode[1],
                    pass: "GuestPass",
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
                    username: false,
                    pass: false,
                },
            });

        if (userData && userData.id) {
            await prismaClient.$disconnect();
            return {
                statusCode: 200,
                body: JSON.stringify(userData),
            };
        } else {
            throw "Could not find given guest!";
        }
    } catch (err) {
        await prismaClient.$disconnect();
        if (typeof err === "string") return resultErrorWithMessage(err);
        else {
            return resultErrorWithMessage("Unexpected server error");
        }
    }
};

export { handler };
