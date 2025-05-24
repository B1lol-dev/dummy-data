import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

// pages
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Recipes from "./pages/Recipes/Recipes";
import Users from "./pages/Users/Users";
import Posts from "./pages/Posts/Posts";
import Login from "./pages/Auth/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// detail pages
import Product from "./pages/Products/Product";
import User from "./pages/Users/User";
import Recipe from "./pages/Recipes/Recipe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/posts" element={<Posts />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
