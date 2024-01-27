import { useContext } from "react";
import axios from "axios";
import { LoginContext } from "../components/LoginContext";

const useLogout = () => {
  const { setAuth } = useContext(LoginContext);

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.get("http://localhost:3500/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
