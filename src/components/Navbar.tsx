import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon, X, Sun, Moon, MessageCircle, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import pitchsapLogo from "@/assets/pitchsap-logo.png";

// Shared island glass style
const ISLAND =
  "backdrop-blur-xl bg-white/70 dark:bg-black/30 border border-purple-200 dark:border-white/10 shadow-[0_4px_24px_rgba(109,40,217,0.1)]";

const navLinks = [
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blogs", href: "/blog" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isLoggedIn = localStorage.getItem("pitchsap_logged_in") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out pt-4 pb-3 px-4 sm:px-6 md:px-10 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-3 items-center max-w-7xl mx-auto gap-3">

        {/* LEFT – Logo island */}
        <div className="flex justify-start">
          <Link
            to="/"
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full ${ISLAND} hover:shadow-[0_4px_28px_rgba(109,40,217,0.18)] transition-all duration-300 group`}
          >
            <img
              src={pitchsapLogo}
              alt="Pitchsap"
              className="h-10 w-auto group-hover:scale-110 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* CENTRE – Navigation island */}
        <div className="flex justify-center">
          <div className={`flex items-center gap-1 px-3 py-2 rounded-full ${ISLAND}`}>

            {/* Standard links */}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/8 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Platform dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setPlatformOpen(true)}
                onMouseLeave={() => setPlatformOpen(false)}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-primary/8 transition-all duration-200"
              >
                Platform
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${platformOpen ? "rotate-180" : ""}`} />
              </button>
              {platformOpen && (
                <div
                  onMouseEnter={() => setPlatformOpen(true)}
                  onMouseLeave={() => setPlatformOpen(false)}
                  className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 w-52 rounded-2xl ${ISLAND} shadow-xl p-2 flex flex-col gap-0.5`}
                >
                  {[
                    { label: "For Ideators", href: "/#how-it-works" },
                    { label: "For Consultants", href: "/#how-it-works" },
                    { label: "Capabilities", href: "/" },
                    { label: "Community", href: "/" },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setPlatformOpen(false)}
                      className="px-4 py-2 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/8 transition-all duration-150"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT – Actions island */}
        <div className="flex justify-end">
          <div className={`flex items-center gap-1 px-3 py-2 rounded-full ${ISLAND}`}>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/8 transition-all duration-200"
            >
              {theme === "dark"
                ? <Sun className="h-4 w-4" />
                : <Moon className="h-4 w-4" />}
            </button>

            {/* Chat (logged in only) */}
            {isLoggedIn && (
              <Link
                to="/chat"
                className="p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/8 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
            )}

            {/* CTA */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 ml-1 px-4 py-1.5 rounded-full text-sm font-semibold text-foreground/80 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            ) : (
              <Link to="/auth">
                <button className="ml-1 px-5 py-1.5 rounded-full text-sm font-bold gradient-primary text-white shadow-md hover:scale-105 hover:shadow-primary/30 transition-all duration-200">
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
            <a href="/#how-it-works" className="py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              How it Works
            </a>
            <a href="/#pricing" className="py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Pricing
            </a>
            <Link to="/blog" className="py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors" onClick={() => setMobileOpen(false)}>
              Blogs
            </Link>
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
