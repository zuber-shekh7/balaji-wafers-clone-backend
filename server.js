import colors from "colors";
import app from "./app.js";

const PROTOCOL = process.env.PROTOCOL;
const HOST = process.env.HOST;
const PORT = process.env.PORT || 4000;

try {
  app.listen(PORT, () => {
    console.log(`Server running on ${PROTOCOL}://${HOST}:${PORT}`.cyan.bold);
  });
} catch (err) {
  console.error(`Something went wrong : ${err.message}`.red.bold);
  process.exit(1);
}
