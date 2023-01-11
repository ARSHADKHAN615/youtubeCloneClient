import React from "react";
import { api } from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/contextApi";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const AuthWrap = ({ children }) => {
  const { setLoading } = useMyContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAuthUser = async () => {
    return api.get("auth/authUser").then((res) => res.data);
  };

  const { data, status } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuthUser,
    retry: false,
    onError: (error) => {
      dispatch(logout());
      navigate("/signin");
      setLoading(false);
      console.log(error);
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return data?.name ? children : <Navigate to="/signin"></Navigate>;
};

export default AuthWrap;
