import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputItem from "../common/InputItem";
import { useResetPasswordMutation } from "../../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetPassword, { error }] = useResetPasswordMutation();
  const toLogin = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await resetPassword({
      token,
      newPassword,
    });
    if (response.data.message) {
      setNewPassword("");
      setMessage("");
      toLogin("/login");
    } else if (response.error) {
      console.error("Password reset failed", error);
      setMessage("Password reset failed");
    }
  };

  return (
    <div>
      <h2>Ustaw nowe hasło</h2>
      <form onSubmit={handleResetPassword}>
        <InputItem
          inputId="resetPwd"
          type="password"
          value={newPassword}
          handleChange={(e) => setNewPassword(e.target.value)}
          placeholder="nowe hasło"
          inputClassName=""
        />
        <InputItem inputClassName="" type="submit" value="Zapisz" />
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
