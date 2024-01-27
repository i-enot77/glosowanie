import { createContext, useState } from "react";

export const LoginContext = createContext();

export default function LoginContextProvider({ children }) {
  const [auth, setAuth] = useState({});

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  const [errMsg, setErrMsg] = useState();
  return (
    <LoginContext.Provider
      value={{
        auth,
        setAuth,
        emailValue,
        setEmailValue,
        passwordValue,
        setPasswordValue,
        persist,
        setPersist,
        errMsg,
        setErrMsg,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
