import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            DG Finds
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === "/" ? "nav-link-active" : ""}`}
            >
              Home
            </Link>
            <Link 
              to="/cities" 
              className={`nav-link ${location.pathname === "/cities" ? "nav-link-active" : ""}`}
            >
              Cities
            </Link>
          </div>

          <button className="p-2 text-neutral-600 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;