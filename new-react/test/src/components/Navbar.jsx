import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Leaf } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`py-4 fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center text-green-800 text-2xl font-bold transition-transform hover:scale-105 duration-300"
        >
          <Leaf className="h-7 w-7 mr-2 text-green-600" strokeWidth={2.5} />
          <span className="bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
            GreenTouch Chemicals
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 text-lg font-medium">
          <li>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg transition duration-300 text-green-800 hover:bg-green-100 hover:text-green-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="px-4 py-2 rounded-lg transition duration-300 text-green-800 hover:bg-green-100 hover:text-green-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-4 py-2 rounded-lg transition duration-300 text-green-800 hover:bg-green-100 hover:text-green-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="px-4 py-2 rounded-lg transition duration-300 text-green-800 hover:bg-green-100 hover:text-green-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:after:w-full"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg transition duration-300 bg-green-600 text-white hover:bg-green-700 border border-green-600 shadow-sm hover:shadow-md"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden bg-green-50 text-green-700 p-2 hover:bg-green-100 rounded-lg focus:outline-none border border-green-200 transition-all duration-200"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50 md:hidden border-t border-green-100">
          <div className="py-2">
            <Link
              to="/"
              className="block px-6 py-3 text-green-800 hover:bg-green-50 transition duration-300 border-l-4 border-transparent hover:border-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-6 py-3 text-green-800 hover:bg-green-50 transition duration-300 border-l-4 border-transparent hover:border-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block px-6 py-3 text-green-800 hover:bg-green-50 transition duration-300 border-l-4 border-transparent hover:border-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/blog"
              className="block px-6 py-3 text-green-800 hover:bg-green-50 transition duration-300 border-l-4 border-transparent hover:border-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="block px-6 py-3 text-green-800 hover:bg-green-50 transition duration-300 border-l-4 border-transparent hover:border-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
