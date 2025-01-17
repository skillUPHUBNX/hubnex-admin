import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
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
    
    <>
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 w-full">
      <Header />
      </div>
      <hr className=" border-neutral-300 dark:border-neutral-600" />
      <div className="w-full md:flex h-screen flex items-center container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 ">
      <Outlet />
      </div>
      <hr className=" border-neutral-300 dark:border-neutral-600" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 w-full">
      <Footer/>
      </div>
      
  
    </>
   
  );
};

export default RootLayout;
