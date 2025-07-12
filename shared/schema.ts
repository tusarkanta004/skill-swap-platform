import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  location: text("location"),
  avatar: text("avatar"),
  skillsOffered: text("skills_offered").array(),
  skillsWanted: text("skills_wanted").array(),
  availability: text("availability"),
  rating: integer("rating").default(0),
  isPublic: boolean("is_public").default(true),
});

export const swapRequests = pgTable("swap_requests", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").references(() => users.id),
  toUserId: integer("to_user_id").references(() => users.id),
  status: text("status").default("pending"), // pending, accepted, rejected
  message: text("message"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  location: true,
  avatar: true,
  skillsOffered: true,
  skillsWanted: true,
  availability: true,
  isPublic: true,
});

export const insertSwapRequestSchema = createInsertSchema(swapRequests).pick({
  fromUserId: true,
  toUserId: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSwapRequest = z.infer<typeof insertSwapRequestSchema>;
export type SwapRequest = typeof swapRequests.$inferSelect;
