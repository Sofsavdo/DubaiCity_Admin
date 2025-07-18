
import { db } from "./db";
import { tasks, skins, businesses, promoCodes, empireLevels, users } from "../shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Empire levels
  await db.insert(empireLevels).values([
    { level: 1, name: "Beginner", description: "Starting level for new players", requiredPoints: 0, rewards: { hourlyIncome: 10 } },
    { level: 2, name: "Entrepreneur", description: "First business milestone", requiredPoints: 1000, rewards: { hourlyIncome: 25 } },
    { level: 3, name: "Investor", description: "Investment opportunities unlocked", requiredPoints: 5000, rewards: { hourlyIncome: 50 } },
    { level: 4, name: "Business Owner", description: "Own multiple businesses", requiredPoints: 15000, rewards: { hourlyIncome: 100 } },
    { level: 5, name: "Millionaire", description: "Reached million milestone", requiredPoints: 50000, rewards: { hourlyIncome: 250 } },
  ]);

  // Tasks
  await db.insert(tasks).values([
    {
      title: "Follow Telegram Channel",
      titleUz: "Telegram kanalga obuna bo'ling",
      description: "Follow our official Telegram channel",
      descriptionUz: "Rasmiy Telegram kanalimizga obuna bo'ling",
      type: "telegram",
      url: "https://t.me/dubaicity_channel",
      reward: 500,
      isActive: true,
    },
    {
      title: "Join Community Chat",
      titleUz: "Jamoa chatiga qo'shiling",
      description: "Join our community chat",
      descriptionUz: "Jamoa chatimizga qo'shiling",
      type: "telegram",
      url: "https://t.me/dubaicity_chat",
      reward: 300,
      isActive: true,
    },
    {
      title: "Follow Instagram",
      titleUz: "Instagram da kuzatib boring",
      description: "Follow us on Instagram",
      descriptionUz: "Instagramda bizni kuzatib boring",
      type: "social",
      url: "https://instagram.com/dubaicity",
      reward: 200,
      isActive: true,
    },
    {
      title: "Watch YouTube Video",
      titleUz: "YouTube videosini tomosha qiling",
      description: "Watch our introduction video",
      descriptionUz: "Tanishuv videomizni tomosha qiling",
      type: "youtube",
      url: "https://youtube.com/watch?v=example",
      reward: 100,
      isActive: true,
    },
  ]);

  // Skins
  await db.insert(skins).values([
    {
      name: "Golden Suit",
      nameUz: "Oltin kostyum",
      description: "Premium golden business suit",
      descriptionUz: "Premium oltin biznes kostyumi",
      price: 1000,
      rarity: "legendary",
      imageUrl: "https://placehold.co/200x200/FFD700/000000?text=👔",
      category: "character",
      isActive: true,
    },
    {
      name: "Diamond Watch",
      nameUz: "Olmosli soat",
      description: "Luxury diamond watch",
      descriptionUz: "Hashamatli olmosli soat",
      price: 2500,
      rarity: "epic",
      imageUrl: "https://placehold.co/200x200/87CEEB/000000?text=⌚",
      category: "accessory",
      isActive: true,
    },
    {
      name: "VIP Car",
      nameUz: "VIP mashina",
      description: "Luxury sports car",
      descriptionUz: "Hashamatli sport mashina",
      price: 5000,
      rarity: "legendary",
      imageUrl: "https://placehold.co/200x200/FF4500/000000?text=🚗",
      category: "vehicle",
      isActive: true,
    },
  ]);

  // Businesses
  await db.insert(businesses).values([
    {
      name: "Coffee Shop",
      nameUz: "Qahvaxona",
      description: "Small coffee shop business",
      descriptionUz: "Kichik qahvaxona biznesi",
      price: 500,
      hourlyProfit: 10,
      requiredLevel: 1,
      category: "food",
      isActive: true,
    },
    {
      name: "Restaurant",
      nameUz: "Restoran",
      description: "Full service restaurant",
      descriptionUz: "To'liq xizmat restorani",
      price: 2000,
      hourlyProfit: 50,
      requiredLevel: 2,
      category: "food",
      isActive: true,
    },
    {
      name: "Hotel",
      nameUz: "Mehmonxona",
      description: "Luxury hotel business",
      descriptionUz: "Hashamatli mehmonxona biznesi",
      price: 10000,
      hourlyProfit: 200,
      requiredLevel: 4,
      category: "hospitality",
      isActive: true,
    },
  ]);

  // Promo codes
  await db.insert(promoCodes).values([
    {
      code: "WELCOME2025",
      reward: 1000,
      usageLimit: 100,
      usedCount: 0,
      isActive: true,
      expiresAt: new Date("2025-12-31"),
    },
    {
      code: "TEST100",
      reward: 500,
      usageLimit: 50,
      usedCount: 0,
      isActive: true,
      expiresAt: new Date("2025-06-30"),
    },
  ]);

  console.log("✅ Database seeded successfully!");
}

seed().catch(console.error);
