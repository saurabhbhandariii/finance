import { useState } from "react";
import { Link } from "wouter";
import { Search, User as UserIcon, LogOut, Settings, LayoutDashboard, ChevronDown } from "lucide-react";
import { useUser, useLogout } from "@/hooks/use-auth";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import mfPreviewImage from "@assets/image_1772649128209.png";

export function Navbar() {
  const { data: user } = useUser();
  const logoutMutation = useLogout();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
              F
            </div>
            <span className="text-2xl font-extrabold tracking-tight">Floow</span>
          </Link>

          {/* Center Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1 flex-1 px-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium bg-transparent hover:bg-secondary/50">Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-[1fr_1fr]">
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Investments</h4>
                        <Link href="/" className="block p-3 hover:bg-secondary rounded-xl transition-colors">
                          <div className="font-semibold text-foreground">Stocks</div>
                          <p className="text-sm text-muted-foreground mt-1">Invest in top Indian companies</p>
                        </Link>
                        <Link href="/" className="block p-3 hover:bg-secondary rounded-xl transition-colors">
                          <div className="font-semibold text-foreground">Mutual Funds</div>
                          <p className="text-sm text-muted-foreground mt-1">Expertly managed portfolios</p>
                        </Link>
                      </div>
                      <div className="bg-secondary/30 p-4 rounded-xl">
                        <img src={mfPreviewImage} alt="Mutual Funds" className="w-full h-auto rounded-lg shadow-sm mb-4" />
                        <div className="font-medium">Trending NFOs</div>
                        <p className="text-xs text-muted-foreground mt-1">Explore newly launched mutual funds before they close.</p>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium bg-transparent hover:bg-secondary/50">Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li>
                        <Link href="/sip-calculator" className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-colors hover:bg-secondary focus:bg-secondary">
                          <div className="text-sm font-semibold">SIP Calculator</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Calculate potential returns on your SIP investments over time.</p>
                        </Link>
                      </li>
                      <li>
                        <Link href="/brokerage-calculator" className="block select-none space-y-1 rounded-xl p-4 leading-none no-underline outline-none transition-colors hover:bg-secondary focus:bg-secondary">
                          <div className="text-sm font-semibold">Brokerage Calculator</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">Estimate your brokerage charges and real profit from trades.</p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Global Search */}
            <div className="relative flex-1 max-w-md ml-auto mr-4 hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="What are you looking for today?" 
                className="w-full pl-10 pr-4 h-12 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background rounded-xl text-base shadow-sm"
              />
            </div>
          </div>

          {/* Right section - Auth */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-12 w-auto gap-2 rounded-full pl-2 pr-4 hover:bg-secondary">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.email.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden sm:block truncate max-w-[120px]">
                      {user.email}
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl card-shadow border-0">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none truncate">{user.email}</p>
                      <p className="text-xs leading-none text-muted-foreground mt-1 truncate">Investor</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem className="cursor-pointer rounded-lg p-3">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-lg p-3">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive focus:text-destructive rounded-lg p-3"
                    onClick={() => logoutMutation.mutate()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="h-11 px-6 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
              >
                Login / Register
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
