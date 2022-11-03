import { Handler } from "@netlify/functions";
import { isUpdateToServerData } from "./../../src/db_utils";
import { DBCollection, getDBCollection } from "./db";

const merge = (coll: DBCollection) => {};

const handler: Handler = async (event, _) => {
  try {
    const req: any = JSON.parse(event.body || "null");

    if (!req || !isUpdateToServerData(req)) throw "";

    const dbConn = await getDBCollection();
    if (!dbConn)
      return { statusCode: 500, body: "Couldn't connect to the databse" };

    const { coll, close } = dbConn;

    if (req.type === "merge") {
    } else {
    }

    close();
    // return data to client
    return { statusCode: 200, body: "Updated" };
  } catch (e) {
    const err = e as SyntaxError;
    return {
      statusCode: 400,
      body: `Couldn't parse the data send.\n${err.message}`,
    };
  }
};

export { handler };
