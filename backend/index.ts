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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: process.env.DATABASE_URL ? "connected" : "not configured",
    telegram: process.env.TELEGRAM_BOT_TOKEN ? "configured" : "not configured"
  });
});

// Telegram Web App authentication
app.post("/api/telegram/auth", async (req, res) => {
  try {
    const { initData } = req.body;
    
    if (!initData) {
      return res.status(400).json({ error: "Init data required" });
    }

    // Parse the user data from initData
    const urlParams = new URLSearchParams(initData);
    const userParam = urlParams.get('user');
    
    if (!userParam) {
      return res.status(400).json({ error: 'User data not found' });
    }

    const userData = JSON.parse(userParam);
    
    // Check if user exists, if not create them
    let user = await storage.getUserByTelegramId(userData.id.toString());
    
    if (!user) {
      user = await storage.createUser({
        telegramId: userData.id.toString(),
        username: userData.username || userData.first_name,
        firstName: userData.first_name,
        lastName: userData.last_name || '',
        dubaiCoin: 1000,
        tapProfit: 1,
        hourlyIncome: 0,
        level: 1,
        energy: 5000,
        maxEnergy: 5000,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase()
      });
    }

    res.json({ user, success: true });
  } catch (error) {
    console.error('Telegram auth error:', error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// User management endpoints
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

// Serve static files in production
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

// Initialize and start server
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
      log(`🤖 Telegram: ${process.env.TELEGRAM_BOT_TOKEN ? 'Configured ✅' : 'Not configured ⚠️'}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();