import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStocks } from "@/hooks/use-stocks";

// Static Image imports
import heroImg from "@assets/image_1772649124262.png";
import featuresImg from "@assets/image_1772649132092.png";
import sipImg from "@assets/image_1772649136463.png";
import scalperImg from "@assets/image_1772649140467.png";
import stockTradingImg from "@assets/image_1772649147438.png";
import testimonialsImg from "@assets/image_1772649151026.png";
import noChargesImg from "@assets/image_1772649155006.png";

export function Home() {
  const { data: stocks, isLoading } = useStocks();

  // Fallback mock data if API is empty/loading
  const displayStocks = stocks?.length ? stocks : [
    { symbol: "RELIANCE", name: "Reliance Industries", price: "2954.20", change: "+12.45", changePercent: "+0.42", type: "stock" },
    { symbol: "TCS", name: "Tata Consultancy", price: "3892.15", change: "-5.30", changePercent: "-0.14", type: "stock" },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: "1432.80", change: "+24.10", changePercent: "+1.71", type: "stock" },
    { symbol: "INFY", name: "Infosys", price: "1678.90", change: "+8.90", changePercent: "+0.53", type: "stock" },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: "1084.50", change: "+1.20", changePercent: "+0.11", type: "stock" }
  ];

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
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                Built for a growing India. Start investing in mutual funds, stocks, and more with zero commission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl transition-all">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-8 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> 100% Secure
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" /> Zero Hidden Charges
                </div>
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
              <h2 className="text-2xl font-bold">Top Stocks</h2>
              <p className="text-muted-foreground mt-1">Market movers today</p>
            </div>
            <Button variant="outline" className="hidden sm:flex rounded-full">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {isLoading && !stocks?.length ? (
              Array(5).fill(0).map((_, i) => (
                <Card key={i} className="rounded-2xl border-0 shadow-sm animate-pulse h-32 bg-card/50" />
              ))
            ) : (
              displayStocks.map((stock: any, i: number) => (
                <Card key={i} className="rounded-2xl border-border/50 card-shadow overflow-hidden cursor-pointer group">
                  <CardContent className="p-5">
                    <div className="font-semibold truncate mb-4 group-hover:text-primary transition-colors">{stock.symbol}</div>
                    <div className="flex items-baseline justify-between mt-auto">
                      <span className="text-xl font-bold">₹{stock.price}</span>
                    </div>
                    <div className={`text-sm mt-1 font-medium ${Number(stock.change) >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      {stock.change} ({stock.changePercent}%)
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
