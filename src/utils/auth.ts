import { API_ENPOINTS, API_URL } from "@/constants/api";
import axios from "axios";

class Auth {
  token = localStorage.getItem("token") || "";
  adminToken = localStorage.getItem("adminToken") || "";

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.token = token;
  }

  private removeToken() {
    localStorage.removeItem("token");
    this.token = "";
  }

  async login(username: string, password: string) {
    try {
      const res = await axios.post(`${API_URL}${API_ENPOINTS.login}`, {
        username,
        password,
      });

      this.setToken(res.data.accessToken);
      return res.data;
    } catch (err: unknown) {
      throw new Error(String(err));
    }
  }

  logout() {
    this.removeToken();
  }

  async getMyInfo(token: string = this.token) {
    if (!token) {
      throw new Error("No token found. Please log in.");
    }

    try {
      const res = await axios.get(`${API_URL}${API_ENPOINTS.authMe}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err: unknown) {
      throw new Error(String(err));
    }
  }

  // admin
  checkAdmin = async () => {
    try {
      if (!this.adminToken) {
        throw new Error("No admin token found. Please log in as admin.");
      }
      const userInfo = await this.getMyInfo(this.adminToken);
      return userInfo.role === "admin";
    } catch (err: unknown) {
      throw new Error("Failed to check admin status: " + String(err));
    }
  };

  setAdminToken(token: string) {
    localStorage.setItem("adminToken", token);
    this.adminToken = token;
  }

  private removeAdminToken() {
    localStorage.removeItem("adminToken");
    this.adminToken = "";
  }

  adminLogout() {
    this.removeAdminToken();
  }

  async adminLogin(username: string, password: string) {
    try {
      const res = await axios.post(`${API_URL}${API_ENPOINTS.login}`, {
        username,
        password,
      });

      this.setAdminToken(res.data.accessToken);
      return res.data;
    } catch (err: unknown) {
      throw new Error(String(err));
    }
  }
}

export const auth = new Auth();
