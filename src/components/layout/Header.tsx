import React, { useState } from "react";
import Container from "../helpers/Container";
import { Link, NavLink } from "react-router-dom";
import { Database } from "lucide-react";
import { Button } from "../ui/button";
import { auth } from "@/utils/auth";

const Header = () => {
  const navLinks: string[] = ["products", "users", "recipes", "posts"];
  const [isLogin, setIsLogin] = useState(auth.token !== "");

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
            {navLinks.map((link: string, index: number) => (
              <li key={index}>
                <NavLink
                  to={"/" + link}
                  className="text-gray-600 capitalize hover:text-gray-950 transition-colors duration-200"
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
          {isLogin ? (
            <Button
              onClick={() => {
                auth.logout();
                setIsLogin(false);
              }}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default React.memo(Header);
