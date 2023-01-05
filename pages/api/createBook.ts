import Chance from "chance";
import { NextApiHandler } from "next/dist/shared/lib/utils";
import "reflect-metadata";
import { Book } from "../../entities/Book";
import { User } from "../../entities/User";
import getEM from "../../utils/getEM";
import withORM from "../../utils/withORM";

const handler: NextApiHandler = async (req, res) => {
  const em = getEM();

  console.log(`context-specific em-ID: ${em.id}`);

  const chance = new Chance();

  const user = await em.findOne(User, { id: 1 });

  const book = new Book();
  book.title = chance.sentence();

  await em.persist(book);

  user.books.add(book);
  await em.flush();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(user));
};

export default withORM(handler);
