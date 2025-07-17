import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { corsMiddleware } from "./cors-config";
import { storage } from "./storage";
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(corsMiddleware);

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

function log(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

function serveStatic(app: express.Express) {
  const staticPath = path.join(process.cwd(), "dist");
  app.use(express.static(staticPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

(async () => {
  try {
    await storage.init();
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      log(`Error: ${status} - ${message}`);
      res.status(status).json({ error: message });
    });

    if (process.env.NODE_ENV === 'production') {
      serveStatic(app);
    }

    const port = parseInt(process.env.PORT as string) || 3001;
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

    server.listen(port, host, () => {
      log(`🚀 Server running on ${host}:${port}`);
      log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      log(`🤖 Telegram Bot Token: ${process.env.TELEGRAM_BOT_TOKEN ? 'Found ✅' : 'Not found ❌'}`);
      log(`🗄️ Database: ${process.env.DATABASE_URL ? 'Connected ✅' : 'Using in-memory storage ⚠️'}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
