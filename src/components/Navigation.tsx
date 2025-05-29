
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Lock, User, LogOut, Shield, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const navigationItems = [
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
  ];

  if (user) {
    navigationItems.unshift({ href: '/dashboard', label: 'Dashboard' });
    navigationItems.unshift({ href: '/create', label: 'Create Capsule' });
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-lavender-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Lock className="w-8 h-8 text-lavender-500" />
            <span className="font-serif text-xl font-bold text-slate-800 dark:text-slate-200">
              Lock The Day
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-slate-600 dark:text-slate-300 hover:text-lavender-600 dark:hover:text-lavender-400 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-3">
                {isSuperAdmin && (
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    <Link to="/superadmin">
                      <Shield className="w-4 h-4 mr-2" />
                      Super Admin
                    </Link>
                  </Button>
                )}
                {isAdmin && !isSuperAdmin && (
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950"
                  >
                    <Link to="/admin">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Link>
                  </Button>
                )}
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {user.user_metadata?.full_name || user.email}
                </span>
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  size="sm"
                  className="border-lavender-200 dark:border-slate-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                asChild 
                className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600"
              >
                <Link to="/auth">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="dark:bg-slate-900 dark:border-slate-700">
                <div className="flex flex-col gap-4 mt-8">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-slate-600 dark:text-slate-300 hover:text-lavender-600 dark:hover:text-lavender-400 font-medium text-lg"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {user ? (
                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                      {isSuperAdmin && (
                        <Button 
                          asChild 
                          variant="outline" 
                          className="justify-start border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to="/superadmin">
                            <Shield className="w-4 h-4 mr-2" />
                            Super Admin
                          </Link>
                        </Button>
                      )}
                      {isAdmin && !isSuperAdmin && (
                        <Button 
                          asChild 
                          variant="outline" 
                          className="justify-start border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to="/admin">
                            <Settings className="w-4 h-4 mr-2" />
                            Admin
                          </Link>
                        </Button>
                      )}
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {user.user_metadata?.full_name || user.email}
                      </p>
                      <Button 
                        onClick={handleSignOut}
                        variant="outline"
                        className="justify-start border-lavender-200 dark:border-slate-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      asChild 
                      className="bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600 mt-4"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/auth">
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                  )}
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
