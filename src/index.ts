import { Elysia, t } from "elysia";
import { RequestDatabase } from "./db";
import { dataProcessingService } from "./services";
import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .decorate("db", RequestDatabase.getInstance())
  .get("/", () => Bun.file("./public/index.html").text())
  .group("/api", (app) =>
    app.post(
      "/data-processing",
      async ({ body: { file }, db, set }) => {
        const start = new Date().getTime();
        const result = await postDataProcessingService(file, db);
        const end = new Date().getTime();
        set.headers = {
          "Content-Type": "application/json",
          "X-Response-Time": `${end - start}ms`,
        };
        return result;
      },
      {
        body: t.Object({
          file: t.File({
            type: "text/csv",
          }),
        }),
      }
    )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

async function postDataProcessingService(file: File, db: RequestDatabase) {
  return await dataProcessingService(file, db);
}
