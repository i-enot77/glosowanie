import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPwdRequestMutation } from "../../services/api";
import InputItem from "../common/InputItem";

const ResetPwdRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetPwdRequest] = useResetPwdRequestMutation();
  const navigate = useNavigate();

  const handleRequestReset = async (e) => {
    e.preventDefault();
    const response = await resetPwdRequest({ username: email });
    if (response.data) {
      setEmail("");
      setMessage("");
      navigate("/sended-email");
    } else if (response.error) {
      console.error("Password reset request failed", response.error);
      setMessage("Password reset request failed");
    }
  };

  return (
    <div>
      <h2>Nie pamiętasz hasła?</h2>
      <p>
        Wystarczy, że podasz swój e-mail, a my pomożemy Ci ustawić nowe hasło.
      </p>
      <form onSubmit={handleRequestReset}>
        <InputItem
          inputId="reset"
          type="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          placeholder={"e-mail adres"}
          inputClassName=""
        />
        <InputItem inputClassName="" type="submit" value="Dalej" />
      </form>

      <p>{message}</p>
    </div>
  );
};

export default ResetPwdRequest;
