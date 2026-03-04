import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  balance: numeric("balance").notNull().default("100000"), // Starting balance for trading
  createdAt: timestamp("created_at").defaultNow(),
});

export const holdings = pgTable("holdings", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  stockId: serial("stock_id").references(() => stocks.id),
  quantity: numeric("quantity").notNull(),
  averagePrice: numeric("average_price").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, balance: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertHoldingSchema = createInsertSchema(holdings).omit({ id: true });
export type InsertHolding = z.infer<typeof insertHoldingSchema>;
export type Holding = typeof holdings.$inferSelect;

export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  price: numeric("price").notNull(),
  change: numeric("change").notNull(),
  changePercent: numeric("change_percent").notNull(),
  type: text("type").notNull(), // e.g., 'stock', 'etf', 'ipo', 'intraday', 'mtf'
});

export const insertStockSchema = createInsertSchema(stocks).omit({ id: true });
export type InsertStock = z.infer<typeof insertStockSchema>;
export type Stock = typeof stocks.$inferSelect;

export const mutualFunds = pgTable("mutual_funds", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amc: text("amc").notNull(),
  nav: numeric("nav").notNull(),
  return3yr: numeric("return_3yr").notNull(),
  risk: text("risk").notNull(),
});

export const insertMutualFundSchema = createInsertSchema(mutualFunds).omit({ id: true });
export type InsertMutualFund = z.infer<typeof insertMutualFundSchema>;
export type MutualFund = typeof mutualFunds.$inferSelect;
