import { db } from "./db";
import { users, stocks, mutualFunds, holdings, type User, type InsertUser, type Stock, type MutualFund, type Holding } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserBalance(id: number, balance: string): Promise<void>;
  
  getStocks(): Promise<Stock[]>;
  getStock(id: number): Promise<Stock | undefined>;
  getMutualFunds(): Promise<MutualFund[]>;

  getHolding(userId: number, stockId: number): Promise<Holding | undefined>;
  updateHolding(userId: number, stockId: number, quantity: string, avgPrice: string): Promise<void>;
  createHolding(userId: number, stockId: number, quantity: string, avgPrice: string): Promise<void>;
  deleteHolding(userId: number, stockId: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserBalance(id: number, balance: string): Promise<void> {
    await db.update(users).set({ balance }).where(eq(users.id, id));
  }

  async getStocks(): Promise<Stock[]> {
    return await db.select().from(stocks);
  }

  async getStock(id: number): Promise<Stock | undefined> {
    const [stock] = await db.select().from(stocks).where(eq(stocks.id, id));
    return stock;
  }

  async getMutualFunds(): Promise<MutualFund[]> {
    return await db.select().from(mutualFunds);
  }

  async getHolding(userId: number, stockId: number): Promise<Holding | undefined> {
    const [holding] = await db.select().from(holdings).where(and(eq(holdings.userId, userId), eq(holdings.stockId, stockId)));
    return holding;
  }

  async updateHolding(userId: number, stockId: number, quantity: string, avgPrice: string): Promise<void> {
    await db.update(holdings).set({ quantity, averagePrice: avgPrice }).where(and(eq(holdings.userId, userId), eq(holdings.stockId, stockId)));
  }

  async createHolding(userId: number, stockId: number, quantity: string, avgPrice: string): Promise<void> {
    await db.insert(holdings).values({ userId, stockId, quantity, averagePrice: avgPrice });
  }

  async deleteHolding(userId: number, stockId: number): Promise<void> {
    await db.delete(holdings).where(and(eq(holdings.userId, userId), eq(holdings.stockId, stockId)));
  }
}

export const storage = new DatabaseStorage();
