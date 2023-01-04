import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useMyContext } from "../context/contextApi";

const Feed = ({type}) => {
    const [videos, setVideos] = useState([]);
    const { setLoading } = useMyContext();
    
    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        const fetchVideos = async () => {
            setLoading(true);
            const { data } = await axios.get(import.meta.env.VITE_API_URL+`video/${type}`,{withCredentials: true,credentials: 'include'});
            setVideos(data);
            setLoading(false);
        };
        fetchVideos();
    }, [type]);

    return (
        <div className="flex flex-row h-[calc(100%-56px)] ">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {videos.map((item, i) => (
                        <VideoCard key={i} video={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feed;
