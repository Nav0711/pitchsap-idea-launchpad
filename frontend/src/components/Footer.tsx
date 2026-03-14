import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Github, Youtube } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/pitchsap", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/pitchsap", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/pitchsap", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/pitchsap", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com/@pitchsap", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer id="footer" className="border-t border-white/10 py-14 backdrop-blur-sm">
      <div className="container mx-auto px-4">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <Link to="/" className="font-display text-xl font-extrabold gradient-text shrink-0">
            Pitchsap
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link to="/auth" className="hover:text-foreground transition-colors">Login</Link>
            <Link to="/auth" className="hover:text-foreground transition-colors">Sign Up</Link>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </nav>

          {/* Social icons – liquid glass pills */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-full backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-[0_4px_14px_rgba(0,0,0,0.08)] ring-1 ring-white/10 text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 hover:shadow-[0_0_12px_rgba(139,92,246,0.25)] transition-all duration-200 hover:scale-110"
              >
                <Icon className="h-4 w-4 drop-shadow-[0_0_4px_rgba(139,92,246,0.4)]" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pitchsap. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
