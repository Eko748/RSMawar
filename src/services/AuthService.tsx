import { login } from "../api/AuthApi";

export const authLogin = async (email, password) => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Error Login:', error);
      throw error;
    }
  };
  