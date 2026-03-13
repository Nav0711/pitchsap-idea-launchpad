import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-display text-lg font-bold gradient-text">
            Pitchsap
          </Link>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <a href="#" className="hover:text-foreground transition-colors">Login</a>
            <a href="#" className="hover:text-foreground transition-colors">Sign Up</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          </nav>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pitchsap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
