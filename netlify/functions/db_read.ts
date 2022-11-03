import { Handler } from "@netlify/functions";
import { isReadToServerData } from "./../../src/db_utils";
import { getDBCollection } from "./db";

const handler: Handler = async (event, _) => {
  try {
    const req: any = JSON.parse(event.body || "null");

    if (!req || !isReadToServerData(req)) throw "";

    const dbConn = await getDBCollection();
    if (!dbConn)
      return { statusCode: 500, body: "Couldn't connect to the databse" };

    const { coll, close } = dbConn;

    if (req.anon) {
      const id = req.id;
      const anonData = await coll.findOne(
        { id, pass: "" },
        { projection: { data: 1 } }
      );
      close();
      if (!anonData)
        return {
          statusCode: 400,
          body: "Couldn't find an anon account with this ID",
        };
      else return { statusCode: 200, body: JSON.parse(anonData.data) };
    } else {
      const { name, pass } = req;
      if (!pass)
        return { statusCode: 400, body: "Password or name not specified" };
      const userData = await coll.findOne(
        { name, pass },
        { projection: { data: 1 } }
      );
      close();
      if (!userData)
        return { statusCode: 400, body: "Username or password are wrong!" };
      else return { statusCode: 200, body: JSON.parse(userData.data) };
    }
  } catch (e) {
    const err = e as SyntaxError;
    return {
      statusCode: 400,
      body: `Couldn't parse the data send.\n${err.message}`,
    };
  }
};

export { handler };
