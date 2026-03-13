import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-display text-xl font-bold gradient-text">
          Pitchsap
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </Link>
          <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blogs
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Login</Button>
          <Button variant="outline" size="sm">Sign Up</Button>
          <Button size="sm" className="gradient-primary text-primary-foreground border-0">Get Started</Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t px-4 pb-4 space-y-3">
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
    </nav>
  );
};

export default Navbar;
