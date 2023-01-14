import React, { useEffect, useState } from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { format } from "timeago.js";
import { getChannelDetails } from "../api";

const VideoCard = ({ video }) => {
    const [channel, setChannel] = useState([]);
    useEffect(() => {
      getChannelDetails(video.userId).then((data) => {
        setChannel(data);
      });
    }, [video.userId]);
    return (
        <Link to={`/video/${video?._id}`}>
            <div className="flex flex-col mb-8">
                <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={video.imgUrl ? video?.imgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSomhbP2KqTxa7Gb3zFcigQbXGHJuq7Aqug7Wex4OlzQ&s"
                        }
                    />
                </div>
                <div className="flex text-white mt-3">
                    <div className="flex items-start">
                        <div className="flex h-9 w-9 rounded-full overflow-hidden">
                            <img
                                className="h-full w-full object-cover"
                                src={channel.img ? channel.img : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${channel?.name}`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col ml-3 overflow-hidden">
                        <span className="text-sm font-bold line-clamp-2">
                            {video.title}
                        </span>
                        <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                            {channel?.name} <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            {/* {video?.author?.badges[0]?.type ===
                                "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )} */}
                        </span>
                        <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                            <span>{`${abbreviateNumber(
                                video.views.length,
                                2
                            )} views`}</span>
                            <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                                .
                            </span>
                            <span className="truncate">
                                {format(video.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
