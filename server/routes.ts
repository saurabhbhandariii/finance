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
    // For demo purposes, we'll auto-login or return the test user
    const user = await storage.getUserByEmail("test@example.com") || (await storage.createUser({ email: "test@example.com", password: "password" }));
    res.json(user);
  });

  // Data Routes
  app.get(api.stocks.list.path, async (req, res) => {
    const stocks = await storage.getStocks();
    res.json(stocks);
  });

  app.post(api.stocks.buy.path, async (req, res) => {
    // Note: In a real app, userId would come from session
    // For now, we'll use a hardcoded user or first user if none provided
    const user = await storage.getUserByEmail("test@example.com") || (await storage.createUser({ email: "test@example.com", password: "password" }));
    const stockId = Number(req.params.id);
    const { quantity } = api.stocks.buy.input.parse(req.body);
    
    const stock = await storage.getStock(stockId);
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const totalCost = Number(stock.price) * quantity;
    if (Number(user.balance) < totalCost) return res.status(400).json({ message: "Insufficient balance" });

    const newBalance = (Number(user.balance) - totalCost).toString();
    await storage.updateUserBalance(user.id, newBalance);

    const holding = await storage.getHolding(user.id, stockId);
    if (holding) {
      const newQty = Number(holding.quantity) + quantity;
      const newAvg = ((Number(holding.averagePrice) * Number(holding.quantity) + totalCost) / newQty).toString();
      await storage.updateHolding(user.id, stockId, newQty.toString(), newAvg);
    } else {
      await storage.createHolding(user.id, stockId, quantity.toString(), stock.price);
    }

    res.json({ message: "Purchase successful", balance: newBalance });
  });

  app.post(api.stocks.sell.path, async (req, res) => {
    const user = await storage.getUserByEmail("test@example.com");
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    const stockId = Number(req.params.id);
    const { quantity } = api.stocks.sell.input.parse(req.body);
    
    const stock = await storage.getStock(stockId);
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    const holding = await storage.getHolding(user.id, stockId);
    if (!holding || Number(holding.quantity) < quantity) return res.status(400).json({ message: "Insufficient holdings" });

    const totalGain = Number(stock.price) * quantity;
    const newBalance = (Number(user.balance) + totalGain).toString();
    await storage.updateUserBalance(user.id, newBalance);

    const newQty = Number(holding.quantity) - quantity;
    if (newQty === 0) {
      await storage.deleteHolding(user.id, stockId);
    } else {
      await storage.updateHolding(user.id, stockId, newQty.toString(), holding.averagePrice);
    }

    res.json({ message: "Sale successful", balance: newBalance });
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
      { symbol: "INFY", name: "Infosys Ltd", price: "1675.40", change: "12.30", changePercent: "0.74", type: "stock" },
      { symbol: "ICICIBANK", name: "ICICI Bank", price: "1085.20", change: "8.40", changePercent: "0.78", type: "stock" },
      { symbol: "SBIN", name: "State Bank of India", price: "765.30", change: "-4.20", changePercent: "-0.55", type: "stock" },
      { symbol: "BHARTIARTL", name: "Bharti Airtel", price: "1210.45", change: "15.20", changePercent: "1.27", type: "stock" },
      { symbol: "ITC", name: "ITC Ltd", price: "435.60", change: "2.30", changePercent: "0.53", type: "stock" },
      { symbol: "WIPRO", name: "Wipro Ltd", price: "512.40", change: "-2.15", changePercent: "-0.42", type: "stock" },
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
      { name: "Axis Bluechip Fund", amc: "Axis Mutual Fund", nav: "45.30", return3yr: "12.4", risk: "Low" },
      { name: "Mirae Asset Large Cap", amc: "Mirae Asset Mutual Fund", nav: "88.20", return3yr: "18.6", risk: "Moderate" },
      { name: "ICICI Pru Bluechip", amc: "ICICI Prudential", nav: "72.45", return3yr: "16.8", risk: "Moderate" },
      { name: "Nippon India Small Cap", amc: "Nippon India", nav: "124.30", return3yr: "38.4", risk: "Very High" },
    ]);
    console.log("Seeded database with initial stocks and mutual funds data.");
  }
}
