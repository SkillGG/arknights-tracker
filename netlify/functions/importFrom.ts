import { Handler } from "@netlify/functions";

import { ResultError, resultErrorWithMessage } from "./utils";

import { PrismaClient, akdata, users } from "../../src/prismaClient";

export type importFromRequest = Pick<users, "pass" | "username">;

export type importFromResult =
    | (Pick<users, "id"> & {
          akdata: Pick<akdata, "history" | "pity" | "settings"> | null;
      })
    | ResultError;

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return resultErrorWithMessage("Invalid request!");
    try {
        const data: importFromRequest = JSON.parse(ev.body);
        if (!data.username)
            return resultErrorWithMessage("No username provided!");

        await prismaClient.$connect();

        const userData: importFromResult | null =
            await prismaClient.users.findFirst({
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

        await prismaClient.$disconnect();

        if (userData && userData.id) {
            return {
                statusCode: 200,
                body: JSON.stringify(userData),
            };
        } else {
            throw "Wrong username or password!";
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
