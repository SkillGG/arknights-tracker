import { Handler } from "@netlify/functions";

import { PrismaClient, users, akdata } from "./../../prisma/prismaClient";

import { DEF_SETTINGS, PastRecruitment } from "./../../src/utils";

export type CreateUserData = Omit<users, "id"> &
    Omit<akdata, "history" | "id" | "userId"> & {
        history?: PastRecruitment[];
    };

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return { statusCode: 400, body: "Invalid request!" };
    try {
        const data: CreateUserData = JSON.parse(ev.body);

        await prismaClient.$connect();

        const usernameAlreadyExists = !!(await prismaClient.users.findFirst({
            where: { username: data.username },
        }));

        if (usernameAlreadyExists) {
            await prismaClient.$disconnect();
            return { statusCode: 400, body: "Username already taken!" };
        }

        const user = await prismaClient.users.create({
            data: {
                id: undefined,
                username: data.username,
                pass: data.pass,
                akdata: {
                    create: {
                        history: data.history || [],
                        pity: data.pity || { standard: 0, special: {} },
                        settings: data.settings || DEF_SETTINGS,
                    },
                },
            },
            include: { akdata: true },
        });
        await prismaClient.$disconnect();
        return { statusCode: 200, body: JSON.stringify(user) };
    } catch (err) {
        await prismaClient.$disconnect();
        return { statusCode: 400, body: "Invalid JSON" + err };
    }
};

export { handler };
