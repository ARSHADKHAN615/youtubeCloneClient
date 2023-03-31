import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdLocalFireDepartment, MdSubscriptions } from "react-icons/md";

export const categories = [
    { name: "New", icon: <AiFillHome />, type: "/" },
    { name: "Trending", icon: <MdLocalFireDepartment />, type: "/trend" },
    { name: "Music", icon: <CgMusicNote />, type: "/sub" },
    { name: "Films", icon: <FiFilm />, type: "category" },
    { name: "Live", icon: <MdLiveTv />, type: "category" },
    { name: "Gaming", icon: <IoGameControllerSharp />, type: "category" },
    // { name: "News", icon: <ImNewspaper />, type: "category" },
    // { name: "Sports", icon: <GiDiamondTrophy />, type: "category" },
    // { name: "Learning", icon: <RiLightbulbLine />, type: "category" },
    // {
    //     name: "Fashion & beauty",
    //     icon: <GiEclipse />,
    //     type: "category",
    //     divider: true,
    // },
    // { name: "Settings", icon: <FiSettings />, type: "menu" },
    // { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
    // { name: "Help", icon: <FiHelpCircle />, type: "menu" },
    // { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },
];
