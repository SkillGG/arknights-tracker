import { Handler } from "@netlify/functions";

import { PrismaClient, akdata, users } from "../../prisma/prismaClient";
import { DEF_SETTINGS, PastRecruitment } from "../../src/utils";
import { ResultError } from "./utils";

export type exportToGuestRequest = Pick<akdata, "pity" | "settings"> & {
    history?: PastRecruitment[];
};

export type exportToGuestResult = Pick<users, "id" | "username"> & {
    akdata: Pick<akdata, "history" | "pity" | "settings">;
};

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return { statusCode: 400, body: "Invalid request!" };
    try {
        const data: exportToGuestRequest = JSON.parse(ev.body);
        await prismaClient.$connect();

        const guestUsername =
            "guest" +
            Math.floor(Math.random() * 1000)
                .toString()
                .padStart(4, "0"); // TODO: better guest randomizer
        const guestpass = "GuestPass";

        const userExists = await prismaClient.users.findFirst({
            where: { username: guestUsername, pass: guestpass },
        });

        if (userExists) {
            await prismaClient.$disconnect();
            throw "Too many guests!";
        } else {
            console.log("Crating guest", guestUsername);

            const userData = await prismaClient.users.create({
                data: {
                    username: guestUsername,
                    pass: guestpass,
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
            console.log(data, userData);
            await prismaClient.$disconnect();
            return {
                statusCode: 200,
                body: JSON.stringify(userData as exportToGuestResult),
            };
        }
    } catch (err) {
        await prismaClient.$disconnect();
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Unexpected error!" + err,
            } as ResultError),
        };
    }
};

export { handler };
