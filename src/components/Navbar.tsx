import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { useTheme } from "@/hooks/use-theme";
import pitchsapLogo from "@/assets/pitchsap-logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 sm:px-6 md:px-8 py-4 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-[2rem] border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-2xl bg-white/10 dark:bg-black/20 overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between px-8 py-3">
            <Link to="/" className="flex items-center gap-2 group transition-all duration-300">
              <div className="bg-white/10 p-1.5 rounded-xl backdrop-blur-md group-hover:scale-110 transition-transform">
                <img src={pitchsapLogo} alt="Pitchsap" className="h-8 w-auto mix-blend-screen" />
              </div>
            </Link>

            <div className="flex items-center">
              <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="How it Works" href="/#how-it-works" />
                <MenuItem setActive={setActive} active={active} item="Platform">
                  <div className="flex flex-col space-y-1 min-w-[180px]">
                    <HoveredLink to="/#how-it-works">For Ideators</HoveredLink>
                    <HoveredLink to="/#how-it-works">For Consultants</HoveredLink>
                    <HoveredLink to="/">Capabilities</HoveredLink>
                    <HoveredLink to="/">Community</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Blogs" href="/blog" />
              </Menu>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
              </button>
              <Link to="/auth">
                <Button size="sm" className="gradient-primary text-primary-foreground border-0 rounded-full px-6 shadow-md hover:scale-105 transition-transform font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center justify-between h-14 px-5">
            <Link to="/" className="flex items-center gap-2">
              <img src={pitchsapLogo} alt="Pitchsap" className="h-6 w-auto mix-blend-screen" />
              <span className="font-display text-lg font-bold text-foreground">Pitchsap</span>
            </Link>
            <div className="flex items-center gap-1">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5" aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {mobileOpen && (
            <div className="md:hidden px-5 pb-5 pt-2 space-y-4 border-t border-white/10 dark:bg-black/10 backdrop-blur-md">
              <Link to="/" className="block py-1 text-base font-medium text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                How it Works
              </Link>
              <Link to="/blog" className="block py-1 text-base font-medium text-foreground hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
                Blogs
              </Link>
              <div className="pt-2">
                <Link to="/auth" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gradient-primary text-primary-foreground border-0 rounded-xl shadow-md font-semibold h-11">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
