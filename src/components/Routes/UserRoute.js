import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate(); 

  console.log("userroutes:", user);

  return user?.user && user?.user?.token ? (
    children
  ) : (
    <div>
      <h1>ยังไม่ได้ล็อคอิน</h1>
      <button onClick={() => navigate("/login")}>Login</button> 
    </div>
  );
};

export default UserRoute;
