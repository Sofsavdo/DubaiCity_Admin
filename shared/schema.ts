import { pgTable, serial, text, timestamp, integer, boolean, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table - unified structure for both admin and web app
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  telegramId: text('telegram_id').unique().notNull(),
  username: text('username').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  dubaiCoin: integer('dubai_coin').default(1000),
  tapProfit: integer('tap_profit').default(1),
  hourlyIncome: integer('hourly_income').default(0),
  level: integer('level').default(1),
  energy: integer('energy').default(5000),
  maxEnergy: integer('max_energy').default(5000),
  boost: integer('boost').default(0),
  maxBoost: integer('max_boost').default(3),
  energyRefill: integer('energy_refill').default(5),
  maxEnergyRefill: integer('max_energy_refill').default(5),
  currentAvatar: text('current_avatar'),
  premiumStatus: boolean('premium_status').default(false),
  premiumUntil: timestamp('premium_until'),
  selectedAppearance: json('selected_appearance'),
  lastDailyReward: timestamp('last_daily_reward'),
  dailyStreak: integer('daily_streak').default(0),
  referralCode: text('referral_code').unique(),
  referredBy: integer('referred_by'),
  isActive: boolean('is_active').default(true),
  isAdmin: boolean('is_admin').default(false),
  isBlocked: boolean('is_blocked').default(false),
  profileImage: text('profile_image'),
  language: text('language').default('uz'),
  lastActive: timestamp('last_active').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Empire levels configuration
export const empireLevels = pgTable('empire_levels', {
  id: serial('id').primaryKey(),
  level: integer('level').unique().notNull(),
  name: text('name').notNull(),
  nameUz: text('name_uz'),
  nameRu: text('name_ru'),
  description: text('description'),
  requiredCoins: integer('required_coins').notNull(),
  hourlyIncome: integer('hourly_income').default(0),
  icon: text('icon'),
  rewards: json('rewards'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tasks table with multilingual support
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  titleUz: text('title_uz'),
  titleRu: text('title_ru'),
  description: text('description'),
  descriptionUz: text('description_uz'),
  descriptionRu: text('description_ru'),
  type: text('type').notNull(),
  platform: text('platform'),
  url: text('url'),
  reward: integer('reward').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// User tasks completion tracking
export const userTasks = pgTable('user_tasks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  taskId: integer('task_id').references(() => tasks.id).notNull(),
  completed: boolean('completed').default(false),
  completedAt: timestamp('completed_at'),
  rewardClaimed: boolean('reward_claimed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Export types for TypeScript
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;