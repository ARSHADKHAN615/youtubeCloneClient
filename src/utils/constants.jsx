import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdLocalFireDepartment, MdSubscriptions } from "react-icons/md";

export const categories = [
    { name: "New", icon: <AiFillHome />, type: "/" },
    { name: "Trending", icon: <MdLocalFireDepartment />, type: "/trend" },
    { name: "Subscribers", icon: <MdSubscriptions />, type: "/sub" },
];
