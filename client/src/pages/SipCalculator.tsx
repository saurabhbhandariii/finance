import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SipCalculator() {
  const [investment, setInvestment] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const calculateSip = (P: number, r: number, t: number) => {
    const i = r / 12 / 100;
    const n = t * 12;
    const invested = P * n;
    const wealth = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const returns = Math.max(0, wealth - invested);
    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(wealth)
    };
  };

  const results = useMemo(() => calculateSip(investment, rate, years), [investment, rate, years]);
  
  const chartData = [
    { name: "Invested Amount", value: results.invested, color: "#E2E8F0" },
    { name: "Est. Returns", value: results.returns, color: "#00D09C" }
  ];

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-secondary/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">SIP Calculator</h1>
          <p className="text-muted-foreground mt-2 text-lg">Calculate your mutual fund returns automatically.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Card className="lg:col-span-7 border-0 card-shadow rounded-3xl overflow-hidden">
            <CardContent className="p-8 space-y-10">
              
              {/* Monthly Investment */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Monthly Investment</label>
                  <div className="relative w-32">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">₹</span>
                    <Input 
                      type="number" 
                      value={investment} 
                      onChange={(e) => setInvestment(Number(e.target.value))} 
                      className="pl-7 font-bold text-right text-lg h-12 bg-secondary/50 border-0 rounded-xl"
                    />
                  </div>
                </div>
                <Slider 
                  value={[investment]} 
                  onValueChange={(val) => setInvestment(val[0])} 
                  max={100000} 
                  step={500}
                  className="py-4"
                />
              </div>

              {/* Expected Return Rate */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Expected Return Rate (p.a)</label>
                  <div className="relative w-24">
                    <Input 
                      type="number" 
                      value={rate} 
                      onChange={(e) => setRate(Number(e.target.value))} 
                      className="pr-7 font-bold text-right text-lg h-12 bg-secondary/50 border-0 rounded-xl"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider 
                  value={[rate]} 
                  onValueChange={(val) => setRate(val[0])} 
                  max={30} 
                  step={0.5}
                  className="py-4"
                />
              </div>

              {/* Time Period */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Time Period</label>
                  <div className="relative w-28">
                    <Input 
                      type="number" 
                      value={years} 
                      onChange={(e) => setYears(Number(e.target.value))} 
                      className="pr-10 font-bold text-right text-lg h-12 bg-secondary/50 border-0 rounded-xl"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-muted-foreground">Yr</span>
                  </div>
                </div>
                <Slider 
                  value={[years]} 
                  onValueChange={(val) => setYears(val[0])} 
                  max={40} 
                  step={1}
                  className="py-4"
                />
              </div>

            </CardContent>
          </Card>

          <Card className="lg:col-span-5 border-0 card-shadow rounded-3xl overflow-hidden bg-foreground text-background flex flex-col">
            <CardContent className="p-8 flex-1 flex flex-col">
              <div className="h-64 w-full mb-8 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm text-background/60">Total Value</span>
                  <span className="text-xl font-bold">{formatCurrency(results.total)}</span>
                </div>
              </div>

              <div className="space-y-6 mt-auto">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-background/80">
                    <div className="w-3 h-3 rounded-full bg-[#E2E8F0]"></div>
                    Invested Amount
                  </div>
                  <span className="font-semibold text-lg">{formatCurrency(results.invested)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-background/80">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    Est. Returns
                  </div>
                  <span className="font-semibold text-lg">{formatCurrency(results.returns)}</span>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-background/80">Total Value</span>
                    <span className="font-bold text-2xl text-primary">{formatCurrency(results.total)}</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-8 h-14 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform">
                Invest Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
