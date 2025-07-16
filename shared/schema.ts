import { pgTable, serial, text, timestamp, integer, boolean, decimal, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  telegramId: text('telegram_id').unique().notNull(),
  balance: decimal('balance', { precision: 10, scale: 2 }).default('0.00'),
  empireLevel: integer('empire_level').default(1),
  isBlocked: boolean('is_blocked').default(false),
  lastActive: timestamp('last_active').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Empire levels table
export const empireLevels = pgTable('empire_levels', {
  id: serial('id').primaryKey(),
  level: integer('level').unique().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  requiredPoints: integer('required_points').notNull(),
  rewards: json('rewards'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Skins table
export const skins = pgTable('skins', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true),
  rarity: text('rarity').default('common'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tasks table
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull(), // 'social', 'daily', 'special'
  platform: text('platform'), // 'instagram', 'youtube', 'telegram'
  reward: decimal('reward', { precision: 10, scale: 2 }).notNull(),
  url: text('url'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// User tasks (tracking completed tasks)
export const userTasks = pgTable('user_tasks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  taskId: integer('task_id').references(() => tasks.id),
  completed: boolean('completed').default(false),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Market items table
export const marketItems = pgTable('market_items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull(),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true),
  stock: integer('stock').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// User purchases table
export const userPurchases = pgTable('user_purchases', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  itemId: integer('item_id').references(() => marketItems.id),
  quantity: integer('quantity').default(1),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  purchasedAt: timestamp('purchased_at').defaultNow(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  type: text('type').default('info'), // 'info', 'warning', 'success', 'error'
  targetUsers: json('target_users'), // Array of user IDs or 'all'
  isActive: boolean('is_active').default(true),
  scheduledFor: timestamp('scheduled_for'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Promo codes table
export const promoCodes = pgTable('promo_codes', {
  id: serial('id').primaryKey(),
  code: text('code').unique().notNull(),
  description: text('description'),
  discountType: text('discount_type').notNull(), // 'percentage', 'fixed'
  discountValue: decimal('discount_value', { precision: 10, scale: 2 }).notNull(),
  maxUses: integer('max_uses'),
  currentUses: integer('current_uses').default(0),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Projects/Missions table
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').default('daily'), // 'daily', 'weekly', 'special'
  reward: decimal('reward', { precision: 10, scale: 2 }).notNull(),
  requirements: json('requirements'),
  isActive: boolean('is_active').default(true),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Team/Company table
export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  ownerId: integer('owner_id').references(() => users.id),
  memberLimit: integer('member_limit').default(10),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Team members table
export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  teamId: integer('team_id').references(() => teams.id),
  userId: integer('user_id').references(() => users.id),
  role: text('role').default('member'), // 'owner', 'admin', 'member'
  joinedAt: timestamp('joined_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  userTasks: many(userTasks),
  purchases: many(userPurchases),
  ownedTeams: many(teams),
  teamMemberships: many(teamMembers),
}));

export const tasksRelations = relations(tasks, ({ many }) => ({
  userTasks: many(userTasks),
}));

export const userTasksRelations = relations(userTasks, ({ one }) => ({
  user: one(users, { fields: [userTasks.userId], references: [users.id] }),
  task: one(tasks, { fields: [userTasks.taskId], references: [tasks.id] }),
}));

export const marketItemsRelations = relations(marketItems, ({ many }) => ({
  purchases: many(userPurchases),
}));

export const userPurchasesRelations = relations(userPurchases, ({ one }) => ({
  user: one(users, { fields: [userPurchases.userId], references: [users.id] }),
  item: one(marketItems, { fields: [userPurchases.itemId], references: [marketItems.id] }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  owner: one(users, { fields: [teams.ownerId], references: [users.id] }),
  members: many(teamMembers),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, { fields: [teamMembers.teamId], references: [teams.id] }),
  user: one(users, { fields: [teamMembers.userId], references: [users.id] }),
}));

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type EmpireLevel = typeof empireLevels.$inferSelect;
export type InsertEmpireLevel = typeof empireLevels.$inferInsert;
export type Skin = typeof skins.$inferSelect;
export type InsertSkin = typeof skins.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;
export type UserTask = typeof userTasks.$inferSelect;
export type InsertUserTask = typeof userTasks.$inferInsert;
export type MarketItem = typeof marketItems.$inferSelect;
export type InsertMarketItem = typeof marketItems.$inferInsert;
export type UserPurchase = typeof userPurchases.$inferSelect;
export type InsertUserPurchase = typeof userPurchases.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
export type PromoCode = typeof promoCodes.$inferSelect;
export type InsertPromoCode = typeof promoCodes.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = typeof teamMembers.$inferInsert;