import { useContext } from "react";
import axios from "axios";
import { LoginContext } from "../components/LoginContext";

const useRefreshToken = () => {
  const { setAuth } = useContext(LoginContext);

  const refresh = async () => {
    const response = await axios.get("http://localhost:3500/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
