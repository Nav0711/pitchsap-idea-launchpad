import { useState } from "react";
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={pitchsapLogo} alt="Pitchsap" className="h-9 w-auto" />
          <span className="font-display text-xl font-bold gradient-text">Pitchsap</span>
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2">
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

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full glass-card hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
          </button>
          <Button variant="ghost" size="sm">Login</Button>
          <Button variant="outline" size="sm">Sign Up</Button>
          <Button size="sm" className="gradient-primary text-primary-foreground border-0">Get Started</Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden glass-card border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={pitchsapLogo} alt="Pitchsap" className="h-8 w-auto" />
            <span className="font-display text-lg font-bold gradient-text">Pitchsap</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="px-4 pb-4 space-y-3 border-t border-border">
            <Link to="/" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              How it Works
            </Link>
            <Link to="/blog" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Blogs
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" size="sm">Login</Button>
              <Button variant="outline" size="sm">Sign Up</Button>
              <Button size="sm" className="gradient-primary text-primary-foreground border-0">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
