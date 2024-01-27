import { readFileSync } from "fs";
import { bodyParser, create, defaults, rewriter, router } from "json-server";
import auth from "json-server-auth";
import { join } from "path";

const readJson = (fileRoute) =>
  JSON.parse(readFileSync(join(process.cwd(), fileRoute), "utf-8"));

// Create app
const app = create();

// Middlewares
app.use(defaults());
app.use(bodyParser);

// Use custom routes from routes.json
app.use(rewriter(readJson("routes.json")));

// Use json-server-auth routes
app.use(auth);

// Use db.json routes
const dbRouter = router(readJson("db.json"));
app.use(dbRouter);
app.db = dbRouter.db;

module.exports = app;
