import { API_ENPOINTS, API_URL } from "@/constants/api";
import axios from "axios";

class Auth {
  authMe() {}

  token = localStorage.getItem("token") || "";

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  private removeToken() {
    localStorage.removeItem("token");
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

  async getMyInfo() {
    try {
      const res = await axios.get(`${API_URL}${API_ENPOINTS.authMe}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      return res.data;
    } catch (err: unknown) {
      throw new Error(String(err));
    }
  }
}

export const auth = new Auth();
