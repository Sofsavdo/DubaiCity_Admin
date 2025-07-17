import { db } from "./db";
import { eq } from "drizzle-orm";
import * as schema from "../shared/schema";

export class Storage {
  private database: typeof db;

  constructor() {
    this.database = db;
  }

  async init() {
    try {
      if (this.database) {
        console.log("✅ Storage initialized with database");
      } else {
        console.log("⚠️ Storage initialized without database (in-memory mode)");
      }
      return true;
    } catch (error) {
      console.error("❌ Storage initialization failed:", error);
      return false;
    }
  }

  async getAllUsers() {
    try {
      if (!this.database) {
        return [];
      }
      return await this.database.select().from(schema.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  async createUser(userData: any) {
    try {
      if (!this.database) {
        throw new Error("Database not available");
      }
      const [user] = await this.database.insert(schema.users).values(userData).returning();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUser(id: number) {
    try {
      if (!this.database) {
        return null;
      }
      const [user] = await this.database
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id));
      return user || null;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }

  async getUserByTelegramId(telegramId: string) {
    try {
      if (!this.database) {
        return null;
      }
      const [user] = await this.database
        .select()
        .from(schema.users)
        .where(eq(schema.users.telegramId, telegramId));
      return user || null;
    } catch (error) {
      console.error("Error fetching user by telegram ID:", error);
      return null;
    }
  }

  async updateUser(id: number, userData: any) {
    try {
      if (!this.database) {
        throw new Error("Database not available");
      }
      const [user] = await this.database
        .update(schema.users)
        .set(userData)
        .where(eq(schema.users.id, id))
        .returning();
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async getAllTasks() {
    try {
      if (!this.database) {
        return [];
      }
      return await this.database.select().from(schema.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }

  async createTask(taskData: any) {
    try {
      if (!this.database) {
        throw new Error("Database not available");
      }
      const [task] = await this.database.insert(schema.tasks).values(taskData).returning();
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async getAll
