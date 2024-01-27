import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputItem from "../common/InputItem";
import { useLoginUserMutation } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthentication,
  setAuth,
  setErrMsg,
  setPersist,
} from "../../services/authenticationSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const { persist } = useSelector(selectAuthentication);
  const { errMsg } = useSelector(selectAuthentication);
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const togglePersist = () => {
    dispatch(setPersist(!persist));
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      user: emailValue,
      pwd: passwordValue,
    });
    if (response.status === 200) {
      const accessToken = response?.data?.accessToken;
      dispatch(setAuth({ emailValue, accessToken }));

      console.log(response.data);
      setEmailValue("");
      setPasswordValue("");
      dispatch(setErrMsg(null));
      navigate("/vote");
    } else if (response.error) {
      if (response.error.status === 400) {
        dispatch(setErrMsg("Brak adresu e-mail lub hasła"));
      } else if (response.error.status === 401) {
        dispatch(setErrMsg("Błędne hasło albo e-mail"));
      } else if (!response.error.data) {
        dispatch(setErrMsg("Brak odpowiedzi od serwera"));
      } else {
        dispatch(setErrMsg("Nieudany login"));
      }
    }
  };
  return (
    <div className="w-[80%]">
      <h1 className="text-3xl font-semibold mb-3 text-center">Logowanie</h1>
      {errMsg && <div className="text-[#f45151] text-3xl">{errMsg}</div>}

      <form onSubmit={loginSubmit}>
        <div className="flex flex-col">
          <label className="text-[#5A5A5D] mb-1" htmlFor="email">
            Nazwa użytkownika lub adres e-mail
          </label>
          <InputItem
            inputId="email"
            type="email"
            inputName="email"
            value={emailValue}
            handleChange={(e) => setEmailValue(e.target.value)}
            placeholder={"adres email"}
            inputClassName="p-1.5 border border-gray-400 rounded-md focus:outline-none"
          />
        </div>

        <div className="flex flex-col my-2 relative">
          <label className="text-[#5A5A5D] mb-1" htmlFor="password">
            Hasło:{" "}
          </label>
          <InputItem
            inputId="password"
            type={isVisible ? "text" : "password"}
            inputName="password"
            value={passwordValue}
            handleChange={(e) => setPasswordValue(e.target.value)}
            inputClassName="p-1.5 border border-gray-400 rounded-md focus:outline-none"
          />
          <FontAwesomeIcon
            className="absolute bottom-[10px] right-[10px]"
            icon={isVisible ? faEyeSlash : faEye}
            style={{ color: "#000000" }}
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>

        <InputItem
          inputClassName="flex justify-center items-center py-2 w-full bg-cyan-400 rounded-md mt-6 mb-3"
          type="submit"
          value="Zaloguj"
        />
      </form>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <InputItem
            inputId="persist"
            type="checkbox"
            inputName="persist"
            handleChange={togglePersist}
            inputClassName="mr-1 w-[15px] h-[15px]"
            checked={persist}
          />
          <label className="text-sm" htmlFor="persist">
            Zapamiętaj mnie
          </label>
        </div>
        <Link className="text-sm" to={"/request-reset"}>
          Przypomnij hasło
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
