import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Authentication Routes
  app.post(api.auth.login.path, async (req, res) => {
    try {
      const input = api.auth.login.input.parse(req.body);
      const user = await storage.getUserByEmail(input.email);
      if (!user || user.password !== input.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Simple cookie-based or session auth could go here
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      const existingUser = await storage.getUserByEmail(input.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await storage.createUser(input);
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
  });

  app.get(api.auth.me.path, async (req, res) => {
    // Currently stateless/mocked for 'me' without real session
    res.status(401).json({ message: "Not authenticated" });
  });

  // Data Routes
  app.get(api.stocks.list.path, async (req, res) => {
    const stocks = await storage.getStocks();
    res.json(stocks);
  });

  app.get(api.mutualFunds.list.path, async (req, res) => {
    const funds = await storage.getMutualFunds();
    res.json(funds);
  });

  // Seed data on startup
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const existingStocks = await storage.getStocks();
  if (existingStocks.length === 0) {
    const { db } = await import("./db");
    const { stocks, mutualFunds } = await import("@shared/schema");
    
    await db.insert(stocks).values([
      { symbol: "RESE", name: "Renewable Energy Solutions", price: "792.52", change: "15.95", changePercent: "2.24", type: "stock" },
      { symbol: "TCS", name: "Tata Consultancy Services", price: "3980.20", change: "-12.50", changePercent: "-0.31", type: "stock" },
      { symbol: "HDFCBANK", name: "HDFC Bank", price: "1540.10", change: "5.40", changePercent: "0.35", type: "stock" },
      { symbol: "RELIANCE", name: "Reliance Industries", price: "2845.60", change: "22.30", changePercent: "0.79", type: "stock" },
      { symbol: "ZOMATO", name: "Zomato", price: "158.40", change: "3.20", changePercent: "2.06", type: "intraday" },
      { symbol: "PAYTM", name: "One97 Communications", price: "430.20", change: "-5.60", changePercent: "-1.28", type: "intraday" },
      { symbol: "NIFTYBEES", name: "Nippon India Nifty 50 BeES", price: "245.10", change: "1.20", changePercent: "0.49", type: "etf" },
      { symbol: "GOLDBEES", name: "Nippon India Gold BeES", price: "52.40", change: "0.15", changePercent: "0.29", type: "etf" },
      { symbol: "ARAVALLI", name: "Aravalli Healthtech", price: "0", change: "0", changePercent: "0", type: "ipo" },
      { symbol: "SATPURA", name: "Satpura Ltd", price: "0", change: "0", changePercent: "0", type: "ipo" },
    ]);

    await db.insert(mutualFunds).values([
      { name: "Quant Small Cap Fund", amc: "Quant Mutual Fund", nav: "245.60", return3yr: "42.5", risk: "Very High" },
      { name: "Parag Parikh Flexi Cap", amc: "PPFAS Mutual Fund", nav: "78.40", return3yr: "24.8", risk: "High" },
      { name: "SBI Small Cap Fund", amc: "SBI Mutual Fund", nav: "156.20", return3yr: "35.2", risk: "Very High" },
      { name: "HDFC Index Fund Nifty 50", amc: "HDFC Mutual Fund", nav: "210.50", return3yr: "15.4", risk: "High" },
    ]);
    console.log("Seeded database with initial stocks and mutual funds data.");
  }
}
