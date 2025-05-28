
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Lock, Star } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/create", label: "Create Capsule" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-lavender-200/50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-lavender-700 hover:text-lavender-800 transition-colors">
            <div className="relative">
              <Lock className="h-6 w-6" />
              <Star className="h-3 w-3 absolute -top-1 -right-1 text-peach-500 animate-sparkle" />
            </div>
            <span className="font-serif text-xl font-semibold">Lock The Day</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-lavender-700 ${
                  isActive(item.href) 
                    ? "text-lavender-700 border-b-2 border-lavender-300" 
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              asChild 
              className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600 text-white border-0"
            >
              <Link to="/create">Create Capsule</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base font-medium transition-colors hover:text-lavender-700 py-2 ${
                        isActive(item.href) 
                          ? "text-lavender-700 border-l-2 border-lavender-300 pl-3" 
                          : "text-slate-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600 text-white mt-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/create">Create Capsule</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
