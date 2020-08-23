import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import router from "./routes.ts";
import notFound from "./404.ts";

const env = config();

const app = new Application();

const HOST = env.APP_HOST || "http://localhost";

const PORT = +env.APP_PORT || 4000;

app.use(oakCors()); // Enable CORS for All Routes
app.use(async (ctx: any, next: any) => { //Renvoie status 200 à toutes les requetes options (PROBLEME CORS)
  if (ctx.request.method == "OPTIONS") {
    ctx.response.status = 200;
  } else {
    await next();
  }
});
app.use(router.routes());

app.use(notFound);

console.log(`server is started at ${HOST}:${PORT}`);
await app.listen({ port: PORT });
