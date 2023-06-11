import { Handler } from "@netlify/functions";
import { DEF_SETTINGS, PastRecruitment, Settings } from "../../src/utils";
import { AkPity, PrismaClient } from "../../src/prismaClient";

export type UpdateDataData = {
    username: string;
    history?: PastRecruitment[];
    pity?: AkPity;
    settings?: Settings;
};

export const handler: Handler = async (ev) => {
    if (!ev.body) return { statusCode: 400, body: "Invalid request!" };
    const data: UpdateDataData = JSON.parse(ev.body);

    const prismaClient = new PrismaClient();

    await prismaClient.$connect();

    await prismaClient.users.update({
        where: {
            username: data.username,
        },
        data: {
            akdata: {
                upsert: {
                    create: {
                        history: data.history || [],
                        pity: data.pity || { standard: 0, special: {} },
                        settings: data.settings || DEF_SETTINGS,
                    },
                    update: {
                        history: data.history || undefined,
                        pity: data.pity || undefined,
                        settings: data.settings || undefined,
                    },
                },
            },
        },
    });

    await prismaClient.$disconnect();

    return { statusCode: 200, body: "OK" };
};
