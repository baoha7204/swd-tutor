import mongoose from "mongoose";
import app from "./app.js";

async function bootstrap() {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");

  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");

  if (!process.env.CLIENT_BASE_URL)
    throw new Error("CLIENT_BASE_URL must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
}

bootstrap();
