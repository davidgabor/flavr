import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchDialog from "./navigation/SearchDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
      isScrolled ? "bg-neutral-900/50 backdrop-blur-sm" : "bg-transparent"
    }`}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-judson text-white">
            Flavr
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors bg-neutral-800/50 rounded-md border border-neutral-700"
          >
            <Search size={16} />
            <span>Search...</span>
            <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </div>

      <SearchDialog open={open} onOpenChange={setOpen} />
    </nav>
  );
};

export default Navbar;