import { Handler } from "@netlify/functions";

import { AkPity, PrismaClient, users } from "../../prisma/prismaClient";

import { PastRecruitment, Settings } from "../../src/utils";

export type CreateUserData = {
    pass?: string;
    username: string;
    history?: PastRecruitment[];
    pity?: AkPity;
    settings?: Settings;
};

export type showUserRequest = {
    username: users["username"];
};

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return { statusCode: 400, body: "Invalid request!" };
    try {
        const data: showUserRequest = JSON.parse(ev.body);
        if (!data.username) throw "No username provided!";

        await prismaClient.$connect();

        const userData = await prismaClient.users.findFirst({
            where: data,
            include: { akdata: true },
        });

        await prismaClient.$disconnect();

        return { statusCode: 200, body: JSON.stringify(userData) };
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Error parsing body!" + err }),
        };
    }
};

export { handler };
