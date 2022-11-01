import { Handler } from "@netlify/functions";
import { isLoginToServerData } from "./../../src/db_utils";
import { getDBCollection } from "./db";

const handler: Handler = async (event, _) => {
  try {
    const req: any = JSON.parse(event.body || "null");

    if (!req || !isLoginToServerData(req)) throw "";

    const dbConn = await getDBCollection();
    if (!dbConn)
      return { statusCode: 500, body: "Couldn't connect to the databse" };

    const { coll, close } = dbConn;
    return { statusCode: 200, body: "" };
  } catch (e) {
    const err = e as SyntaxError;
    return {
      statusCode: 400,
      body: `Couldn't parse the data send.\n${err.message}`,
    };
  }
};

export { handler };
