import { Handler } from "@netlify/functions";

import { AkPity, PrismaClient } from "./../../prisma/prismaClient";

import { PastRecruitment, Settings } from "./../../src/utils";

export type CreateUserData = {
    pass?: string;
    username: string;
    history?: PastRecruitment[];
    pity?: AkPity;
    settings?: Settings;
};

const handler: Handler = async () => {
    const prismaClient = new PrismaClient();
    // if (!ev.body) return { statusCode: 400, body: "Invalid request!" };

    await prismaClient.$connect();

    await prismaClient.users.deleteMany({});
    await prismaClient.akdata.deleteMany({});

    await prismaClient.$disconnect();

    return { statusCode: 200, body: "OK" };
};

export { handler };
