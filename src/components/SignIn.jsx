import React, { useState } from "react";
import LeftNav from "./LeftNav";
import { useSelector, useDispatch } from "react-redux";
import { loginFailed, loginStart, loginSuccess } from "../slices/userSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { provider, auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";
const SignIn = () => {
  const currentUser = useSelector((state) => state.User);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(currentUser);
  const [formData, setForm] = useState({
    name: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };
  const signInGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
    console.log(result);
    }).catch((error) => {
     console.log(error);
    });
  }
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await fetch(
        import.meta.env.VITE_API_URL + "auth/signin",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(formData),          
        }
      );
      const parseRes = await response.json();
      console.log(parseRes);
      if (response.ok) {
        dispatch(loginSuccess(parseRes));
        navigate('/');
      } else {
        dispatch(loginFailed());
      }
    } catch (err) {
      dispatch(loginFailed());
      console.error(err.message);
    }
  };
  return (
    <div className="flex flex-row h-[calc(100%-56px)] ">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                {/* social login button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-full h-12 space-x-2">
                    <button className="flex items-center justify-center w-full h-full space-x-2 text-sm font-medium text-white transition duration-150 ease-in rounded-md border-2 border-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600" onClick={()=>signInGoogle()}>
                      <svg
                        className="h-6 w-6 fill-current text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        width="2443"
                        height="2500"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 262"
                      >
                        <path
                          fill="#4285F4"
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        />
                        <path
                          fill="#34A853"
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        />
                        <path
                          fill="#FBBC05"
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        />
                        <path
                          fill="#EB4335"
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        />
                      </svg>
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                </div>
                {/* or */}
                <div className="flex items-center justify-center w-full mt-4 space-x-2">
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                  <div className="flex-none text-xs text-gray-500 uppercase dark:text-gray-400">
                    or
                  </div>
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                </div>

                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={onSubmitForm}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.name}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.password}
                      onChange={onChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <NavLink
                      to="/signup"
                      className="text-primary-600 hover:underline dark:text-primary-400"
                    >
                      Sign up
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
