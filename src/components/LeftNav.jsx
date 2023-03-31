import React from "react";
import { NavLink } from "react-router-dom";
import { categories } from "../utils/constants";
import { useMyContext } from "../context/contextApi";
import { useSelector } from "react-redux";

const LeftNav = () => {
  const { mobileMenu } = useMyContext();
  const { currentUser } = useSelector((state) => state.User);

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full ${
        mobileMenu ? "translate-x-0" : ""
      }`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <NavLink
                to={item.type}
                className="text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15]"
              >
                <span className="text-xl mr-5">{item.icon}</span>
                {item.name}
              </NavLink>
            </React.Fragment>
          );
        })}
        {/* signin button like youtube */}
        {!currentUser && (
          <>
            {/* <hr className="my-5 border-white/[0.2]" />
            <span className="text-white">Subscription</span>
            <div className="flex items-center mt-3 flex-col">
              <div className="text-white text-sm cursor-pointer h-10 w-full flex items-center p-3 my-1 rounded-lg hover:bg-white/[0.15]">
                <span className="text-xl mr-5">
                  {" "}
                  <div className="flex h-9 w-9 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&name="
                    />
                  </div>
                </span>
                Channel 1
              </div>
            </div> */}

            <hr className="my-5 border-white/[0.2]" />

            <NavLink
              to="/signin"
              className="text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15]"
            >
              <span className="text-xl mr-5">
                <svg
                  className="h-6 w-6 fill-current text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"
                    fill="#fff"
                    className="color000000 svgShape"
                  />
                </svg>
              </span>
              Sign In
            </NavLink>
            {/* <NavLink
              to="/signup"
              className="text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15]"
            >
              <span className="text-xl mr-5">
                <svg
                  className="h-6 w-6 fill-current text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"
                    fill="#fff"
                    className="color000000 svgShape"
                  />
                </svg>
              </span>
              Sign Up
            </NavLink> */}
          </>
        )}

        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">
          Created by <span className="text-white">Arshad</span>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
