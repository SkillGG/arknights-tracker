import { Handler } from "@netlify/functions";

import { PrismaClient, akdata, users } from "../../prisma/prismaClient";
import { DEF_SETTINGS, PastRecruitment } from "../../src/utils";
import { ResultError, resultErrorWithMessage } from "./utils";

export type exportToRequest = Pick<users, "pass" | "username"> &
    Pick<akdata, "pity" | "settings"> & { history?: PastRecruitment[] } & {
        mergeType: "merge" | "overwrite";
    };

export type exportToResult =
    | (Pick<users, "id"> & {
          akdata: Pick<akdata, "history" | "pity" | "settings"> | null;
      })
    | ResultError;

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body) return resultErrorWithMessage("Invalid request");
    try {
        const data: exportToRequest = JSON.parse(ev.body);
        if (!data.username) throw "No username provided!";

        await prismaClient.$connect();

        const userExists = await prismaClient.users.findFirst({
            where: { username: data.username },
        });

        if (userExists) {
            if (userExists.pass !== data.pass)
                throw "Wrong username or password!";
            // overwrite / merge depending on the mergeType

            await prismaClient.$disconnect();
            throw "User already exists!";
        } else {
            // create new account
            const userData: exportToResult = await prismaClient.users.create({
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
            return {
                statusCode: 200,
                body: JSON.stringify(userData),
            };
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
