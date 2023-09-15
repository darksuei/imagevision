import { config } from "dotenv";
import { DataSource } from "typeorm";
import { Users } from "./src/entities/Users";

const environment = process.env.NODE_ENV || "development";
const envFileName = `.env.${environment}`;

config({ path: envFileName });

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: process.env.DB_URI,
  entities: [Users],
});
