import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/sales", label: "Sales Form" },
    { href: "/purchases", label: "Purchase Form" },
    { href: "/aryan", label: "Aryan" },
    { href: "/ronak", label: "Ronak" },
    { href: "/anshu", label: "Anshu" },
  ];

  return (
    <header className="bg-white border-b-2 border-[#EB1414] shadow-sm md:px-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-[#EB1414]"
          >
            3B Auto Experts
          </Link>

          <nav className="flex space-x-6">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
