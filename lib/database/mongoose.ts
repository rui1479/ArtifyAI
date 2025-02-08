import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const cached: MongooseConnection = (global as unknown as { mongoose?: MongooseConnection }).mongoose ?? {
  conn: null,
  promise: null,
};


export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MongoDB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "artifyAI",
      bufferCommands: false,
    })

    cached.conn = await cached.promise;

    return cached.conn;
};
