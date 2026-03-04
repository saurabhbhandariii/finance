import { db } from "./db";
import { users, stocks, mutualFunds, type User, type InsertUser, type Stock, type MutualFund } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getStocks(): Promise<Stock[]>;
  getMutualFunds(): Promise<MutualFund[]>;
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

  async getStocks(): Promise<Stock[]> {
    return await db.select().from(stocks);
  }

  async getMutualFunds(): Promise<MutualFund[]> {
    return await db.select().from(mutualFunds);
  }
}

export const storage = new DatabaseStorage();
