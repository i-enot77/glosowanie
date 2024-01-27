import { useState, useContext, useRef } from "react";
import { LoginContext } from "../LoginContext";
import InputItem from "../common/InputItem";
import useAxiosRefresh from "../../hooks/useAxiosRefresh";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

function Vote() {
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState("");
  const [answer, setAnswer] = useState("");
  const errorRef = useRef();
  const navigate = useNavigate();

  const axiosRefresh = useAxiosRefresh();
  const logout = useLogout();

  const { errMsg, setErrMsg } = useContext(LoginContext);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosRefresh.post(
        "http://localhost:3500/vote",
        JSON.stringify({ useremail: userEmail, user, answer }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        setUserEmail("");
        setUser("");
        setAnswer("");
        console.log("Twoj glos zostal zapisany");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setErrMsg("Nie możesz zmienić odpowiedzi, masz już odpowiedź.");
        setUserEmail("");
        setUser("");
        setAnswer();
      } else {
        setErrMsg("Błąd zapisu odpowiedzi.");
      }
    }
  };
  return (
    <div>
      <p ref={errorRef}>{errMsg ? errMsg : null}</p>
      <p>Wypełnij formularz i oddaj głos na najlepsze projekty!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userEmail">
            Adres email:
            <InputItem
              inputId="userEmail"
              type="email"
              inputName="userEmail"
              value={userEmail}
              handleChange={(e) => setUserEmail(e.target.value)}
              placeholder={"adres email"}
            />
          </label>

          <label htmlFor="user">
            Podaj imię i nazwisko:
            <InputItem
              inputId="user"
              type="text"
              inputName="user"
              value={user}
              handleChange={(e) => setUser(e.target.value)}
              placeholder={"imię i nazwisko"}
            />
          </label>
        </div>
        <p>Wybierz opcję: </p>
        <div>
          <InputItem
            id="tak"
            type="radio"
            inputName="option"
            value={"tak"}
            handleChange={(e) => setAnswer(e.target.value)}
            checked={answer === "tak"}
          />
          <label htmlFor="tak">Tak</label>
        </div>

        <div>
          <InputItem
            id="nie"
            type="radio"
            inputName="option"
            value={"nie"}
            handleChange={(e) => setAnswer(e.target.value)}
            checked={answer === "nie"}
          />
          <label htmlFor="nie">Nie</label>
        </div>

        <InputItem type="submit" value="Głosuj" />
      </form>
      <button onClick={signOut}>Wyloguj</button>
    </div>
  );
}

export default Vote;
