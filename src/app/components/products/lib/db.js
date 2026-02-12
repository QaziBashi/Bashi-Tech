// import mongoose from "mongoose";

// export const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;

//   await mongoose.connect(process.env.MONGO_URI);
// };
// Frontend DB helper removed. Use backend APIs instead.
export default async function connectToDB() {
	throw new Error("Frontend DB helper removed — use backend API.");
}
