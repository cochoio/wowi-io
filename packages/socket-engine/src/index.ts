import "dotenv/config";
import fastify from "fastify";
import autoLoad from "fastify-autoload";
import fastifyCookie from "fastify-cookie";
import path from "path";
const app = fastify();

const port = process.env.PORT || 5000;
const host = "0.0.0.0";

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

app.listen(port, host, (err, address) => {
  if (err) console.error(`Server Running Error `, err);

  console.log(`Server Running At ${address}`);
});
