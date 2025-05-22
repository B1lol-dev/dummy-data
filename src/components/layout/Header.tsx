import React from "react";
import Container from "../helpers/Container";
import { Link } from "react-router-dom";
import { Database } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  const navLinks: string[] = ["products", "users", "recipes", "posts"];

  return (
    <header>
      <Container>
        <nav className="flex items-center justify-between py-6">
          <Link to="/">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Database />
                DummyData
              </h1>
            </div>
          </Link>
          <ul className="flex flex-wrap gap-6">
            {navLinks.map((link: string) => (
              <li>
                <Link
                  to={"/" + link}
                  className="text-gray-600 capitalize hover:text-gray-950 transition-colors duration-200"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
          <Button>Login</Button>
        </nav>
      </Container>
    </header>
  );
};

export default React.memo(Header);
