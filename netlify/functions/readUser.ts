import { Handler } from "@netlify/functions";

import { PrismaClient, akdata, users } from "../../prisma/prismaClient";
import { resultErrorWithMessage } from "./utils";

export type showUserRequest = Omit<users, "id">;

export type importFromResult = Pick<users, "id"> & {
    akdata: Pick<akdata, "history" | "pity" | "settings">;
};

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return resultErrorWithMessage("Invalid request");
    try {
        const data: showUserRequest = JSON.parse(ev.body);
        if (!data.username)
            return resultErrorWithMessage("No username provided!");

        await prismaClient.$connect();

        const userData = await prismaClient.users.findFirst({
            where: data,
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
            throw "Wrong username or password!";
        }
    } catch (err) {
        prismaClient.$disconnect();
        if (typeof err === "string") return resultErrorWithMessage(err);
        else {
            return resultErrorWithMessage("Unexpected server error");
        }
    }
};

export { handler };
