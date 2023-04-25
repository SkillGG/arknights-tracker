import { Handler } from "@netlify/functions";

import { PrismaClient, akdata, users } from "../../prisma/prismaClient";
import { DEF_SETTINGS, PastRecruitment } from "../../src/utils";

export type exportToGuestRequest = Pick<akdata, "pity" | "settings"> & {
    history?: PastRecruitment[];
};

export type exportToGuestResult = Pick<users, "id"> & {
    akdata: Pick<akdata, "history" | "pity" | "settings">;
};

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return { statusCode: 400, body: "Invalid request!" };
    try {
        const data: exportToGuestRequest = JSON.parse(ev.body);
        await prismaClient.$connect();

        const guestUsername = "guest"; // TODO: username randomizer
        const guestpass = "";

        const userExists = await prismaClient.users.findFirst({
            where: { username: guestUsername, pass: guestpass },
        });

        if (userExists) {
            await prismaClient.$disconnect();
            return { statusCode: 400, body: "User already exists!" };
        } else {
            const userData = await prismaClient.users.create({
                data: {
                    id: undefined,
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
                    username: false,
                    pass: false,
                },
            });
            await prismaClient.$disconnect();
            return { statusCode: 400, body: JSON.stringify({ userData }) };
        }
    } catch (err) {
        await prismaClient.$disconnect();
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Unexpected error!" + err }),
        };
    }
};

export { handler };
