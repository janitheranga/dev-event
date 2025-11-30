import mongoose from "mongoose";

// Define the connection type for caching
interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Validate that the MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Initialize the cached connection object
// In development, use a global variable to preserve the connection across hot reloads
// In production, the cache will be scoped to this module
let cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

// Store the cache in the global object for development
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * Implements connection caching to prevent multiple connections in serverless environments
 * 
 * @returns Promise that resolves to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // If connection already exists, return it immediately
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering to fail fast in serverless
    };

    // Create the connection promise
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    // Wait for the connection promise to resolve and cache the connection
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, reset the promise so it can be retried
    cached.promise = null;
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;
