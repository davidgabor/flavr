import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, Search, X } from "lucide-react";
import SearchDialog from "./navigation/SearchDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled ? "bg-neutral-900/50 backdrop-blur-sm" : "bg-transparent"
      }`}>
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="text-2xl font-judson text-white pr-6 md:pr-12 border-r border-neutral-700"
              >
                Flavr
              </Link>
              
              <div className="hidden md:flex items-center pl-12 space-x-8">
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
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors bg-neutral-800/50 rounded-md border border-neutral-700"
              >
                <Search size={16} />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-400">
                  <span className="text-xs">⌘</span>K
                </kbd>
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
              </div>
            </div>
          </div>
        )}
      </nav>

      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default Navbar;