import express from "express";
import { storage } from "./storage";
import { corsMiddleware } from "./cors-config";
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(corsMiddleware);

function log(message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// Directly define routes without registerRoutes function
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await storage.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = await storage.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await storage.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.get("/api/skins", async (req, res) => {
  try {
    const skins = await storage.getAllSkins();
    res.json(skins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skins" });
  }
});

app.get("/api/businesses", async (req, res) => {
  try {
    const businesses = await storage.getAllBusinesses();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch businesses" });
  }
});

app.post("/api/telegram/auth", async (req, res) => {
  try {
    const { initData } = req.body;
    
    if (!initData) {
      return res.status(400).json({ error: "Init data required" });
    }

    res.json({ 
      user: { 
        id: 1, 
        username: "testuser", 
        dubaiCoin: 1000 
      }, 
      success: true 
    });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Serve static files
if (process.env.NODE_ENV === 'production') {
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
    log("✅ Storage initialized successfully");

    const port = parseInt(process.env.PORT as string) || 3001;
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

    app.listen(port, host, () => {
      log(`🚀 Server running on ${host}:${port}`);
      log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      log(`🗄️ Database: ${process.env.DATABASE_URL ? 'Connected ✅' : 'Using in-memory storage ⚠️'}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
