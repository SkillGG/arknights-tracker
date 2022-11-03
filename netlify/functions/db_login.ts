import { Handler } from "@netlify/functions";
import { compare } from "bcrypt";
import { DB_LoginToServer, isLoginToServerData } from "./../../src/db_utils";
import { DBCollection, getDBCollection } from "./db";

type User = { pass: string; id: number };

const findUser = async (
  coll: DBCollection,
  name: string
): Promise<User | false> => {
  const data = await coll.findOne<User>(
    { name },
    { projection: { pass: 1, id: 1, _id: 0 } }
  );
  if (!data) return false;
  if (
    data.id &&
    typeof data.id === "number" &&
    data.pass &&
    typeof data.pass === "string"
  )
    return data;
  return false;
};

const findAnon = async (coll: DBCollection, id: number): Promise<boolean> => {
  return !!(await coll.findOne({ id, pass: "" }));
};

const login = async (
  coll: DBCollection,
  req: DB_LoginToServer
): Promise<number | null> => {
  if (req.anon) {
    return (await findAnon(coll, req.id)) ? req.id : null;
  } else {
    const user = await findUser(coll, req.name);
    if (!user) return null;
    if (await compare(req.pass, user.pass)) return user.id;
    return null;
  }
};

const handler: Handler = async (event, _) => {
  try {
    const req = JSON.parse(event.body || "null");

    if (!req || !isLoginToServerData(req)) throw "";

    const dbConn = await getDBCollection();
    if (!dbConn)
      return { statusCode: 500, body: "Couldn't connect to the databse" };

    const { coll, close } = dbConn;

    const logged = await login(coll, req);

    close();
    if (!logged)
      return {
        statusCode: 400,
        body: JSON.stringify({
          err: req.anon
            ? "Could not find anon with this ID"
            : "Incorrect login or password!",
        }),
      };
    return { statusCode: 200, body: JSON.stringify({ success: logged }) };
  } catch (e) {
    const err = e as SyntaxError;
    return {
      statusCode: 400,
      body: `Couldn't parse the data send.\n${err.message}`,
    };
  }
};

export { handler };
