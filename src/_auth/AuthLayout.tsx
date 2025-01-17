import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
