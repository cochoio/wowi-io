import "dotenv/config";
import fastify from "fastify";
import autoLoad from "fastify-autoload";
import fastifyCookie from "fastify-cookie";
import path from "path";
const app = fastify();

app.register(fastifyCookie);
// server.register(fastifySession, {
//   secret: "NEcUwj484Jz27mLyk5wd36LSrxffdcU4",
// });

app.register(autoLoad, {
  dir: path.join(__dirname, "plugins"),
});

app.register(autoLoad, {
  dir: path.join(__dirname, "route"),
});

app.listen(3001, (err, address) => {
  if (err) console.error(`Server Running Error `, err);

  console.log(`Server Running At ${address}`);
});
