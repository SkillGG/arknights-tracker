import { Handler } from "@netlify/functions";

import { ResultError } from "./utils";

import { PrismaClient, akdata, users } from "../../prisma/prismaClient";

export type showUserRequest = Pick<users, "username">;

export type importFromResult =
    | (Pick<users, "id"> & {
          akdata: Pick<akdata, "history" | "pity" | "settings">;
      })
    | ResultError;

const handler: Handler = async (ev) => {
    const prismaClient = new PrismaClient();
    if (!ev.body)
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid request!" }),
        };
    try {
        const data: showUserRequest = JSON.parse(ev.body);
        if (!data.username) throw "No username provided!";

        const guestCode = /(\d+)/.exec(data.username);
        if (!guestCode) throw "Incorrect guest username format! Use <guestID>";

        await prismaClient.$connect();

        const userData = await prismaClient.users.findFirst({
            where: { ...data, pass: "GuestPass" },
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
            return { statusCode: 400, body: "Could not find given guest!" };
        }
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Error parsing body!" + err }),
        };
    }
};

export { handler };
