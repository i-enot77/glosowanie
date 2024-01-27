import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthentication } from "../../services/authenticationSlice";
import { useRefreshMutation } from "../../services/api";

const PersistLogin = () => {
  const navigate = useNavigate();
  const { persist } = useSelector(selectAuthentication);
  const { auth } = useSelector(selectAuthentication);
  const [refresh, { error }] = useRefreshMutation();

  useEffect(() => {
    if (persist) {
      if (error || !auth) {
        console.error("Error refreshing token");
        navigate("/login");
      } else if (auth) {
        auth.accessToken ? refresh() : navigate("/login");
      }
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PersistLogin;
