// Frontend DB connector removed. Use backend services instead.
export default async function connectToDB() {
  throw new Error("DB connector moved to backend. Call backend API for data.");
}
