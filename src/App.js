import { Routes, Route } from "react-router-dom";
import "./App.css";
import RegistrationForm from "./components/login/RegistrationForm";
import LoginForm from "./components/login/LoginForm";
import Dashboard from "./components/glosowanie/Dashboard";
import Vote from "./components/glosowanie/Vote";
import PersistLogin from "./components/login/PersistLogin";
import ResetPwdRequest from "./components/login/ResetPwdRequest";
import ResetPassword from "./components/login/ResetPassword";
import SendEmailInfo from "./components/login/SendEmailInfo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/register"} element={<RegistrationForm />} />
        <Route path={"/login"} element={<LoginForm />} />
        <Route path={"/"} element={<Dashboard />} />
        <Route path="/request-reset" element={<ResetPwdRequest />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path={"/sended-email"} element={<SendEmailInfo />} />
        <Route element={<PersistLogin />}>
          <Route path={"/vote"} element={<Vote />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
