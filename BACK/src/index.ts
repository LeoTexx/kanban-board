import express from "express";
import dotenv from "dotenv";
import { PrismaDatabase } from "./shared/database/PrismaDatabase";
import { CardRepository, CardHandler, CardService, CardRouter } from "./cards";
import { AuthRouter } from "./shared/routes/AuthRouter";
import { GlobalRoutes } from "./routes";

dotenv.config();

const app = express();
const PORT = 5000;

const prismaDatabase = PrismaDatabase.getInstance();
const cardRepository = new CardRepository(prismaDatabase);
const cardService = new CardService(cardRepository);
const cardHandler = new CardHandler(cardService);
const authRouter = new AuthRouter();
const cardRouter = new CardRouter(cardHandler);
const globalRoutes = new GlobalRoutes(authRouter, cardRouter);

app.use(express.json());
app.use("/", globalRoutes.getRouter());

app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
