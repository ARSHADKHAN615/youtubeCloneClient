import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UploadVideo from "./components/UploadVideo";
import Cookies from "js-cookie";
import AuthWrap from "./wrapper/AuthWrap";

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            <Route path="/" exact element={<Feed type="random" />} />
            <Route path="/trend" exact element={<Feed type="trend" />} />
            <Route
              path="/sub"
              exact
              element={
                <AuthWrap>
                  <Feed type="sub" />
                </AuthWrap>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/upload"
              element={
                <AuthWrap>
                  <UploadVideo />
                </AuthWrap>
              }
            />
            <Route
              path="/searchResult/:searchQuery"
              element={<SearchResult />}
            />
            <Route path="/video/:id" element={<VideoDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext>
  );
};

export default App;
