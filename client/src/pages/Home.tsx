import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, ShoppingCart, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStocks, useBuyStock, useSellStock } from "@/hooks/use-stocks";
import { useUser } from "@/hooks/use-auth";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// AI-generated Images
import heroImg from "/images/generated_image_0.png";
import featuresImg from "/images/generated_image_1.png";
import sipImg from "/images/generated_image_2.png";
import scalperImg from "/images/generated_image_2.png"; // Reusing high quality stock/phone image
import stockTradingImg from "/images/generated_image_2.png"; 
import testimonialsImg from "/images/generated_image_4.png"; 
import noChargesImg from "/images/generated_image_3.png";
import officeImg from "/images/generated_image_4.png";

export function Home() {
  const { data: stocks, isLoading } = useStocks();
  const { data: user } = useUser();
  const buyMutation = useBuyStock();
  const sellMutation = useSellStock();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (id: number, val: string) => {
    const num = parseInt(val) || 0;
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  const handleBuy = (id: number) => {
    const qty = quantities[id] || 1;
    buyMutation.mutate({ id, quantity: qty });
  };

  const handleSell = (id: number) => {
    const qty = quantities[id] || 1;
    sellMutation.mutate({ id, quantity: qty });
  };

  // Fallback mock data if API is empty/loading
  const displayStocks = stocks?.length ? stocks : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-xl relative z-10">
              <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground">
                All things <br/>
                <span className="text-primary">finance,</span><br/>
                right here.
              </h1>
              {user && (
                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 inline-block">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Your Balance</p>
                  <p className="text-3xl font-bold">₹{parseFloat(user.balance).toLocaleString()}</p>
                </div>
              )}
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                Built for a growing India. Start investing in mutual funds, stocks, and more with zero commission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl transition-all">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full"></div>
              <img src={heroImg} alt="Floow App 3D UI" className="relative z-10 w-full max-w-[600px] mx-auto animate-in fade-in zoom-in duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Market Watch / Stocks Quick View */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold">Market Watch</h2>
              <p className="text-muted-foreground mt-1">Live stock updates and trading</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && !stocks?.length ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="rounded-2xl border-0 shadow-sm animate-pulse h-48 bg-card/50" />
              ))
            ) : (
              displayStocks.map((stock: any, i: number) => (
                <Card key={i} className="rounded-2xl border-border/50 card-shadow overflow-hidden group hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold text-lg group-hover:text-primary transition-colors">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{stock.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">₹{stock.price}</div>
                        <div className={`text-sm font-medium ${Number(stock.change) >= 0 ? 'text-primary' : 'text-destructive'}`}>
                          {stock.change > 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                        </div>
                      </div>
                    </div>

                    {user && (
                      <div className="space-y-4 pt-4 border-t border-border/50">
                        <div className="flex gap-2">
                          <Input 
                            type="number" 
                            min="1" 
                            placeholder="Qty" 
                            className="w-20 rounded-xl"
                            value={quantities[stock.id] || ""}
                            onChange={(e) => handleQuantityChange(stock.id, e.target.value)}
                          />
                          <Button 
                            className="flex-1 rounded-xl gap-2" 
                            onClick={() => handleBuy(stock.id)}
                            disabled={buyMutation.isPending}
                          >
                            <ShoppingCart className="w-4 h-4" /> Buy
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 rounded-xl gap-2 border-destructive/20 text-destructive hover:bg-destructive/5" 
                            onClick={() => handleSell(stock.id)}
                            disabled={sellMutation.isPending}
                          >
                            <DollarSign className="w-4 h-4" /> Sell
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Stocks Grid */}
      <section className="py-24 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold">Trending Stocks</h2>
              <p className="text-muted-foreground mt-2">Most active stocks in the market right now</p>
            </div>
            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5">View All Stocks</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStocks.slice(0, 8).map((stock: any, i: number) => (
              <div key={i} className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center font-bold text-primary group-hover:scale-110 transition-transform">
                    {stock.symbol[0]}
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs font-bold ${Number(stock.change) >= 0 ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
                    {Number(stock.change) >= 0 ? '↑' : '↓'} {Math.abs(Number(stock.changePercent))}%
                  </div>
                </div>
                <div className="font-bold text-lg mb-1">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground mb-4 truncate">{stock.name}</div>
                <div className="text-2xl font-black">₹{stock.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section: Trading features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src={stockTradingImg} alt="Advanced Trading" className="w-full rounded-3xl shadow-2xl" />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Advanced Tools <br/> for <span className="text-primary">Traders</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Experience lightning fast trading with real-time charts, advanced technical indicators, and seamless execution. Built for professionals, accessible to everyone.
              </p>
              <ul className="space-y-4 pt-4">
                {["Live Market Data", "Advanced Charting (TradingView)", "One-click order execution"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-semibold text-foreground/80">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: Mutual Funds & SIP */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=80')] opacity-5 mix-blend-overlay bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Wealth creation <br/> on autopilot
              </h2>
              <p className="text-lg text-white/80 leading-relaxed font-medium">
                Start a Systematic Investment Plan (SIP) and watch your wealth compound over time. Choose from 5000+ direct mutual funds and pay zero commission.
              </p>
              <div className="pt-6">
                <Link href="/sip-calculator">
                  <Button variant="secondary" size="lg" className="h-14 px-8 rounded-full text-primary font-bold hover:bg-white hover:scale-105 transition-all">
                    Calculate SIP Returns
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img src={sipImg} alt="SIP Graph" className="w-full drop-shadow-2xl rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Scalper Mode */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Introducing Scalper Mode</h2>
            <p className="text-xl text-muted-foreground">The fastest way to trade Options in India.</p>
          </div>
          <img src={scalperImg} alt="Scalper Mode interface" className="mx-auto w-full max-w-5xl rounded-3xl shadow-2xl border border-border/50" />
        </div>
      </section>

      {/* Zero Charges & Features Banner */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-6">Zero Account Opening Charges</h2>
              <p className="text-lg text-muted-foreground mb-8">Opening an account with Floow is completely free. We don't charge any hidden fees or maintenance charges for your demat account.</p>
              <img src={noChargesImg} alt="Free Demat Account" className="max-w-xs rounded-2xl shadow-lg" />
            </div>
            <div>
              <img src={featuresImg} alt="App Features" className="w-full drop-shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials snippet */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-12">Loved by millions of Indians</h2>
          <img src={testimonialsImg} alt="User Testimonials" className="w-full max-w-4xl mx-auto drop-shadow-md rounded-2xl" />
        </div>
      </section>
    </div>
  );
}
