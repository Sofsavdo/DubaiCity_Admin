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

  async getAllSkins() {
    try {
      if (!this.database) {
        return [];
      }
      return await this.database.select().from(schema.skins);
    } catch (error) {
      console.error("Error fetching skins:", error);
      return [];
    }
  }

  async createSkin(skinData: any) {
    try {
      if (!this.database) {
        throw new Error("Database not available");
      }
      const [skin] = await this.database.insert(schema.skins).values(skinData).returning();
      return skin;
    } catch (error) {
      console.error("Error creating skin:", error);
      throw error;
    }
  }

  async getAllBusinesses() {
    try {
      if (!this.database) {
        return [];
      }
      return await this.database.select().from(schema.businesses);
    } catch (error) {
      console.error("Error fetching businesses:", error);
      return [];
    }
  }

  async createBusiness(businessData: any) {
    try {
      if (!this.database) {
        throw new Error("Database not available");
      }
      const [business] = await this.database.insert(schema.businesses).values(businessData).returning();
      return business;
    } catch (error) {
      console.error("Error creating business:", error);
      throw error;
    }
  }

  async getAllNotifications() {
    try {
      if (!this.database) {
        return [];
      }
      return await this.database.select().from(schema.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  }

  async createNotification(notificationData: any) {
    try {
      if (!this.database) {
        throw new Error("Database not available");
      }
      const [notification] = await this.database.insert(schema.notifications).values(notificationData).returning();
      return notification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  }

  async getUserReferrals(userId: number) {
    try {
      if (!this.database) {
        return [];
      }
      return await this.database
        .select()
        .from(schema.referrals)
        .where(eq(schema.referrals.referrerId, userId));
    } catch (error) {
      console.error("Error fetching referrals:", error);
      return [];
    }
  }

  async createReferral(referralData: any) {
    try {
      if (!this.database) {
        throw new Error("Database not available");
      }
      const [referral] = await this.database.insert(schema.referrals).values(referralData).returning();
      return referral;
    } catch (error) {
      console.error("Error creating referral:", error);
      throw error;
    }
  }
}

// Singleton instance - faqat bir marta export qilamiz
export const storage = new Storage();
