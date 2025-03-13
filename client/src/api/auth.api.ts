import { customAxios } from "@/config/axios";
import { User } from "@/contexts/auth.context";

export type LoginInputs = {
  email: string;
  password: string;
};

export type RegisterInputs = {
  name: string;
  email: string;
  password: string;
  YOB: number;
  gender: boolean;
};

const authApi = {
  fetchSelf: async () => {
    const response = await customAxios.get("/auth/self");
    return response.data as {
      currentUser: User;
    };
  },

  login: async (loginData: LoginInputs) => {
    const response = await customAxios.post("/auth/signin", loginData);
    return response.data as User;
  },

  register: async (registerData: RegisterInputs) => {
    const response = await customAxios.post("/auth/signup", registerData);
    return response.data as User;
  },

  logout: async () => {
    await customAxios.post("/auth/signout");
  },
};

export default authApi;
