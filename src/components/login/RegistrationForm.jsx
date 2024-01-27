import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import InputItem from "../common/InputItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthentication,
  setAuth,
  setErrMsg,
} from "../../services/authenticationSlice";
import { useRegisterUserMutation } from "../../services/api";
import Button from "../common/Button";

function RegistrationForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const { errMsg } = useSelector(selectAuthentication);
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser({
      user: emailValue,
      pwd: passwordValue,
    });

    if (result.data) {
      const accessToken = result.data?.accessToken;
      dispatch(setAuth({ user: emailValue, accessToken }));
      setEmailValue("");
      setPasswordValue("");
      dispatch(setErrMsg(null));
      navigate("/sended-email");
    } else if (result.error) {
      const { status } = result.error;
      console.error("Error object:", result.error);

      console.log("Error status:", status);
      if (status === 409) {
        dispatch(setErrMsg("Nazwa użytkownika zajęta"));
      } else if (!result.error.data) {
        dispatch(setErrMsg("Brak odpowiedzi od serwera"));
      } else {
        dispatch(setErrMsg("Rejestracja nieudana"));
      }
    }
  };

  return (
    <div className="w-[80%]">
      <h1 className="text-3xl font-semibold mb-3 text-center">
        Zarejestruj się
      </h1>
      {errMsg && <div className="text-[#f45151] text-3xl">{errMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-[#5A5A5D] mb-1" htmlFor="email">
            Adres email:{" "}
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

        <Button btnClass="flex justify-center items-center py-2 w-full bg-cyan-400 rounded-md my-2">
          Zarejestruj się
        </Button>
      </form>
    </div>
  );
}

export default RegistrationForm;
