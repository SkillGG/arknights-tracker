import { Collection, Document, MongoClient } from "mongodb";

const { DB_COLLECTION, DB_CONN_STRING, DB_NAME } = process.env;

export type DBCollection = Collection<Document>;

export const getDBCollection = async () => {
  if (DB_COLLECTION && DB_CONN_STRING && DB_NAME) {
    const client = new MongoClient(DB_CONN_STRING);
    const coll = client.db(DB_NAME).collection(DB_COLLECTION);
    const close = client.close;
    return { coll, close };
  } else return null;
};
