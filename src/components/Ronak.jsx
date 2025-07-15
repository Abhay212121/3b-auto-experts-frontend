import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import { useEffect } from "react";

const Ronak = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    if (!isToken) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <UserDashboard userName={"Ronak"} />
    </>
  );
};

export default Ronak;
