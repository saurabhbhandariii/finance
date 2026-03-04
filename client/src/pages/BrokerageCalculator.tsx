import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BrokerageCalculator() {
  const [buyPrice, setBuyPrice] = useState<number>(1000);
  const [sellPrice, setSellPrice] = useState<number>(1100);
  const [quantity, setQuantity] = useState<number>(100);

  // Simplified brokerage logic for UI purposes
  const turnover = (buyPrice + sellPrice) * quantity;
  // Let's assume standard Equity Delivery brokerage: ₹20 or 0.05% whichever is lower per trade
  const buyBrokerage = Math.min(20, (buyPrice * quantity) * 0.0005);
  const sellBrokerage = Math.min(20, (sellPrice * quantity) * 0.0005);
  const totalBrokerage = buyBrokerage + sellBrokerage;
  
  const stt = Math.round((sellPrice * quantity) * 0.001); // 0.1% on sell side for delivery
  const exchangeCharges = turnover * 0.0000345;
  const gst = (totalBrokerage + exchangeCharges) * 0.18;
  const totalTaxes = totalBrokerage + stt + exchangeCharges + gst;
  
  const grossPnL = (sellPrice - buyPrice) * quantity;
  const netPnL = grossPnL - totalTaxes;

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(num);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-secondary/20 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Brokerage Calculator</h1>
          <p className="text-muted-foreground mt-2 text-lg">Calculate brokerage and regulatory charges transparently.</p>
        </div>

        <Card className="border-0 card-shadow rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Inputs */}
              <div className="p-8 md:p-10 bg-background space-y-8">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Buy Price (₹)</Label>
                  <Input 
                    type="number" 
                    value={buyPrice || ''} 
                    onChange={(e) => setBuyPrice(Number(e.target.value))} 
                    className="h-14 bg-secondary/50 border-0 rounded-xl text-lg font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sell Price (₹)</Label>
                  <Input 
                    type="number" 
                    value={sellPrice || ''} 
                    onChange={(e) => setSellPrice(Number(e.target.value))} 
                    className="h-14 bg-secondary/50 border-0 rounded-xl text-lg font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quantity</Label>
                  <Input 
                    type="number" 
                    value={quantity || ''} 
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                    className="h-14 bg-secondary/50 border-0 rounded-xl text-lg font-bold"
                  />
                </div>
              </div>

              {/* Outputs */}
              <div className="p-8 md:p-10 bg-foreground text-background flex flex-col justify-center space-y-6">
                
                <div className={`p-6 rounded-2xl ${netPnL >= 0 ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive-foreground'} text-center mb-4`}>
                  <div className="text-sm opacity-80 mb-1 font-medium">Net Profit & Loss</div>
                  <div className="text-4xl font-extrabold">{formatCurrency(netPnL)}</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-background/70">Turnover</span>
                    <span className="font-semibold text-lg">{formatCurrency(turnover)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-background/70">Brokerage</span>
                    <span className="font-medium">{formatCurrency(totalBrokerage)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-background/70">STT Total</span>
                    <span className="font-medium">{formatCurrency(stt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-background/70">Exchange Txn Charge</span>
                    <span className="font-medium">{formatCurrency(exchangeCharges)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-background/70">GST (18%)</span>
                    <span className="font-medium">{formatCurrency(gst)}</span>
                  </div>
                </div>
                
                <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-semibold text-background/90">Total Tax & Charges</span>
                  <span className="font-bold text-xl">{formatCurrency(totalTaxes)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
