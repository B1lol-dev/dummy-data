import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";

// pages
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Recipes from "./pages/Recipes/Recipes";
import Users from "./pages/Users/Users";
import Posts from "./pages/Posts/Posts";
import Login from "./pages/Auth/Login";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Wip from "./pages/Wip/Wip";

// detail pages
import Product from "./pages/Products/Product";
import User from "./pages/Users/User";
import Recipe from "./pages/Recipes/Recipe";
import Post from "./pages/Posts/Post";

// admin pages
import AdminLayout from "./pages/Admin/AdminLayout";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminProducts from "./pages/Admin/tabs/AdminProducts";
import AdminUsers from "./pages/Admin/tabs/AdminUsers";
import AdminRecipes from "./pages/Admin/tabs/AdminRecipes";
import AdminPosts from "./pages/Admin/tabs/AdminPosts";
import AdminOrders from "./pages/Admin/tabs/AdminOrders";
import AdminAnalytics from "./pages/Admin/tabs/AdminAnalytics";
import AdminReports from "./pages/Admin/tabs/AdminReports";
import AdminSettings from "./pages/Admin/tabs/AdminSettings";
import AdminSupport from "./pages/Admin/tabs/AdminSupport";

function App() {
  return (
    <>
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
            <Route path="/posts/:id" element={<Post />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="recipes" element={<AdminRecipes />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="support" element={<AdminSupport />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wip" element={<Wip />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
