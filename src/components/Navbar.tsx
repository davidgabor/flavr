import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import SearchDialog from "./navigation/SearchDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
      isScrolled ? "bg-neutral-900/50 backdrop-blur-sm" : "bg-transparent"
    }`}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-judson text-white pr-6 md:pr-12 md:border-r md:border-neutral-700"
            >
              Flavr
            </Link>
            
            <div className="hidden md:flex items-center pl-12 space-x-8">
              <Link 
                to="/about" 
                className={`text-sm ${isActive('/about') ? 'text-white' : 'text-neutral-400 hover:text-white'} transition-colors duration-200`}
              >
                About
              </Link>
              <Link 
                to="/destinations" 
                className={`text-sm ${isActive('/destinations') ? 'text-white' : 'text-neutral-400 hover:text-white'} transition-colors duration-200`}
              >
                Destinations
              </Link>
              <Link 
                to="/people" 
                className={`text-sm ${isActive('/people') ? 'text-white' : 'text-neutral-400 hover:text-white'} transition-colors duration-200`}
              >
                People
              </Link>
              <Link 
                to="/blog" 
                className={`text-sm ${isActive('/blog') ? 'text-white' : 'text-neutral-400 hover:text-white'} transition-colors duration-200`}
              >
                Blog
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-400 hover:text-white transition-colors p-2"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-neutral-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-900/95 backdrop-blur-sm border-t border-neutral-800">
          <div className="container px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm ${isActive('/about') ? 'text-white' : 'text-neutral-400'} transition-colors duration-200`}
              >
                About
              </Link>
              <Link 
                to="/destinations" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm ${isActive('/destinations') ? 'text-white' : 'text-neutral-400'} transition-colors duration-200`}
              >
                Destinations
              </Link>
              <Link 
                to="/people" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm ${isActive('/people') ? 'text-white' : 'text-neutral-400'} transition-colors duration-200`}
              >
                People
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm ${isActive('/blog') ? 'text-white' : 'text-neutral-400'} transition-colors duration-200`}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      )}

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </nav>
  );
};

export default Navbar;