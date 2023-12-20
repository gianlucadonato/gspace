import { MongoClient } from "mongodb";

let client;
let clientPromise: Promise<MongoClient> | undefined;
const options = {};

if (process.env.NODE_ENV !== "test") {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI not set");
  }
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(process.env.MONGODB_URI, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(process.env.MONGODB_URI, options);
    clientPromise = client.connect();
  }
}
// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
