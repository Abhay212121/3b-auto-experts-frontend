import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/sales", label: "Sales Form" },
    { href: "/purchases", label: "Purchase Form" },
    { href: "/newproduct", label: "Add new product" },
    { href: "/aryan", label: "Aryan" },
    { href: "/ronak", label: "Ronak" },
    { href: "/anshu", label: "Anshu" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b-2 border-[#EB1414] shadow-sm md:px-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-[#EB1414]"
        >
          3B AutoXperts
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  location.pathname === item.href
                    ? "bg-[#EB1414] text-white"
                    : "text-black hover:bg-[#c5b9b996]"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger Button - Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#EB1414] focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    location.pathname === item.href
                      ? "bg-[#EB1414] text-white"
                      : "text-black hover:bg-[#c5b9b996]"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
