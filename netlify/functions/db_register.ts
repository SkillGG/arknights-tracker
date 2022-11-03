import { Handler } from "@netlify/functions";
import { hash } from "bcrypt";
import { randomInt } from "crypto";
import {
  DB_RegisterToServer,
  isRegisterToServerData,
} from "./../../src/db_utils";
import { DBCollection, getDBCollection } from "./db";

const getFreeID = async (coll: DBCollection) => {
  let id: string | null = null;
  let attempt = 0;
  while (!id && attempt < 10) {
    id = `${randomInt(1, 999 * 100)}`;
    if (await coll.findOne({ id })) id = null;
  }
  if (id) return id;
  else return null;
};

const register = async (
  coll: DBCollection,
  req: DB_RegisterToServer
): Promise<string | { err: string; code: number }> => {
  try {
    if (req.anon) {
      // create new anon acc
      const id = await getFreeID(coll);

      if (!id) throw null;

      const res = await coll.insertOne({ name: id, id: id, pass: "" });

      if (res.insertedId) return id;
      else throw null;
    } else {
      // create new acc

      const alreadyUsed = await coll.findOne({ name: req.name });
      if (alreadyUsed) throw new Error("User already exists!");

      const hashed = hash(req.pass, 12).catch((r) => null);
      if (!hashed) throw null;
      const id = await getFreeID(coll);
      if (!id) throw null;
      if (
        (await coll.insertOne({ pass: hashed, name: req.name, id: id }))
          .insertedId
      )
        return id;
      else throw null;
    }
  } catch (e) {
    // something went wrong, couldn't create the account!
    if (typeof e === "object") {
      // user f-d up
      const err = e as Error;
      return { err: e.message, code: 400 };
    }
    // server f-d up
    return { err: "Something went wrong with the server", code: 500 };
  }
};

const handler: Handler = async (event, _) => {
  try {
    const req = JSON.parse(event.body || "null");

    if (!req || !isRegisterToServerData(req)) throw "";

    const dbConn = await getDBCollection();
    if (!dbConn)
      return { statusCode: 500, body: "Couldn't connect to the databse" };

    const { coll, close } = dbConn;

    const registered = await register(coll, req);

    close();

    if (typeof registered !== "string")
      return {
        statusCode: registered.code,
        body: JSON.stringify({
          err: `Could not create a new account!\n${registered.err}`,
        }),
      };

    return { statusCode: 200, body: JSON.stringify({ success: registered }) };
  } catch (e) {
    const err = e as SyntaxError;
    return {
      statusCode: 400,
      body: `Couldn't parse the data send.\n${err.message}`,
    };
  }
};

export { handler };
