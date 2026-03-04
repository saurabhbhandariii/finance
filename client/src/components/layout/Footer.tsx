import { Link } from "wouter";
import footerImg from "@assets/image_1772649160760.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 cursor-pointer mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                F
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">Floow</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground/80">
              Floow is India's fast-growing investment platform. Invest in Mutual Funds, Stocks, ETFs and more safely and securely.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Products</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">Stocks</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">Mutual Funds</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">US Stocks</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">Fixed Deposits</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Tools</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/sip-calculator" className="hover:text-white transition-colors cursor-pointer">SIP Calculator</Link></li>
              <li><Link href="/brokerage-calculator" className="hover:text-white transition-colors cursor-pointer">Brokerage Calculator</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">Lumpsum Calculator</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">EMI Calculator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">Pricing</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">Blog</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors cursor-pointer">Help & Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 mt-12 flex flex-col items-center">
          <img src={footerImg} alt="Trusted by millions" className="w-full max-w-3xl opacity-80 mix-blend-screen grayscale" />
          <div className="mt-8 text-center text-xs text-muted-foreground/60">
            <p>© {new Date().getFullYear()} Floow Nextbillion Technology Private Limited. All rights reserved.</p>
            <p className="mt-2">Investments in securities market are subject to market risks, read all the related documents carefully before investing.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
