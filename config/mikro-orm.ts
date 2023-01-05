import { User } from "../entities/User";
import { Options } from "@mikro-orm/core";
import { Book } from "../entities/Book";

const config: Options = {
  clientUrl: process.env.POSTGRES_URL,
  type: "postgresql",
  entities: [User, Book],
  debug: true,
};

export default config;
