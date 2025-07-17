import express from "express";
import { storage } from "./storage";

export async function registerRoutes(app: express.Express) {
  const server = require("http").createServer(app);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      database: process.env.DATABASE_URL ? "connected" : "not configured"
    });
  });

  // Users endpoints
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

  // Tasks endpoints
  app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await storage.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  // Skins endpoints
  app.get("/api/skins", async (req, res) => {
    try {
      const skins = await storage.getAllSkins();
      res.json(skins);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch skins" });
    }
  });

  // Businesses endpoints
  app.get("/api/businesses", async (req, res) => {
    try {
      const businesses = await storage.getAllBusinesses();
      res.json(businesses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch businesses" });
    }
  });

  // Telegram auth endpoint
  app.post("/api/telegram/auth", async (req, res) => {
    try {
      const { initData } = req.body;
      
      if (!initData) {
        return res.status(400).json({ error: "Init data required" });
      }

      // Simple response for now
      res.json({ 
        user: { 
          id: 1, 
          username: "testuser", 
          dubaiCoin: 1000,
          telegramId: "123456789"
        }, 
        success: true 
      });
    } catch (error) {
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  return server;
}
