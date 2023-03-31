import React from "react";
import { api } from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/contextApi";
import { useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LeftNav from "../components/LeftNav";
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
    return (
      <div className="flex flex-row h-[calc(100%-56px)] ">
        <LeftNav />
        <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            Waiting for auth...
          </div>
        </div>
      </div>
    );
  }
  return data?.name ? children : <Navigate to="/signin"></Navigate>;
};

export default AuthWrap;
