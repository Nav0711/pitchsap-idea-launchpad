import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X, Sun, Moon, MessageCircle, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import pitchsapLogo from "@/assets/pitchsap-logo.png";

// Shared island glass style
const ISLAND = "glass-island px-3 py-2 rounded-full whitespace-nowrap overflow-hidden transition-all duration-300";

const navLinks = [
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Why Pitchsap", href: "/#WhyPitchsapSection" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/#footer" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isLoggedIn = localStorage.getItem("pitchsap_logged_in") === "true";
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("pitchsap_token");
    localStorage.removeItem("pitchsap_logged_in");
    localStorage.removeItem("pitchsap_user");
    navigate("/");
    window.location.reload();
  };

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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out pt-4 pb-3 px-4 sm:px-6 md:px-10 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center max-w-7xl mx-auto gap-4">

        {/* LEFT – Logo island */}
        <div className="flex justify-start">
          <Link
            to="/"
            className={`${ISLAND} px-4 py-2.5 flex items-center gap-2.5 hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] group`}
          >
            <img
              src={pitchsapLogo}
              alt="Pitchsap"
              className="h-10 w-auto group-hover:scale-105 transition-transform duration-300 relative z-10 brightness-110"
            />
          </Link>
        </div>

        {/* CENTRE – Navigation island */}
        <div className="flex justify-center">
          <div className={`${ISLAND} flex items-center gap-1 shadow-[0_0_20px_rgba(139,92,246,0.1)]`}>

            {/* Standard links */}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-1.5 rounded-full text-sm font-bold text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
           
          </div>
        </div>

        {/* RIGHT – Actions island */}
        <div className="flex justify-end">
          <div className={`${ISLAND} flex items-center gap-1 shadow-[0_0_20px_rgba(139,92,246,0.1)]`}>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              {theme === "dark"
                ? <Sun className="h-4 w-4 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
                : <Moon className="h-4 w-4 drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]" />}
            </button>

            {/* Chat (logged in only) */}
            {isLoggedIn && (
              <Link
                to="/chat"
                className="p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4 drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]" />
              </Link>
            )}

            {/* Logout/Login */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 ml-1 px-4 py-1.5 rounded-full text-xs font-bold text-foreground/80 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            ) : (
              <Link to="/auth">
                <button className="ml-1 px-5 py-1.5 rounded-full text-xs font-bold gradient-primary text-white shadow-lg hover:scale-105 hover:shadow-primary/40 transition-all duration-200">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE ─────────────────────────────────────────────────────── */}
      <div className="md:hidden max-w-7xl mx-auto">
        <div className={`flex items-center justify-between px-4 py-2.5 rounded-2xl ${ISLAND}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={pitchsapLogo} alt="Pitchsap" className="h-6 w-auto" />
            <span className="font-display font-bold text-base text-foreground">Pitchsap</span>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-foreground/70 hover:text-primary transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {isLoggedIn && (
              <Link to="/chat" className="p-2 rounded-full text-foreground/70 hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
              </Link>
            )}
            <button
              className="p-2 rounded-full text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={`mt-2 rounded-2xl ${ISLAND} px-5 py-4 flex flex-col gap-1`}>
            <a href="/#how-it-works" className="py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" onClick={(e) => scrollToSection(e, "/#how-it-works")}>
              How it Works
            </a>
            <a href="/#WhyPitchsapSection" className="py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" onClick={(e) => scrollToSection(e, "/#WhyPitchsapSection")}>
              Why Pitchsap
            </a>
            <Link to="/blog" className="py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Blogs
            </Link>
            <a href="/#footer" className="py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" onClick={(e) => scrollToSection(e, "/#footer")}>
              Contact Us
            </a>
            <div className="pt-2 border-t border-purple-200/60 dark:border-white/10">
              {isLoggedIn ? (
                <Button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full bg-secondary text-secondary-foreground rounded-xl font-semibold h-10"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gradient-primary text-white rounded-xl font-semibold h-10">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
