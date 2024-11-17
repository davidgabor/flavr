import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-neutral-900/90 to-neutral-900/0 backdrop-blur-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-light text-white">
            DG Finds
          </Link>

          <button className="p-2 text-neutral-400 hover:text-white transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;