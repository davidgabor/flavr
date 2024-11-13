import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary">
            DG Finds
          </Link>

          <button className="p-2 text-neutral-600 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;