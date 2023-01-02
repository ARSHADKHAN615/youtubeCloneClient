import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsBell, BsFillBellFill, BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
import Comments from "./Comments";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
          <div className="ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="80vh"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
              <div className="flex ml-3">
                <button className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                  <BsBell className="text-white text-[20px] mr-2" />
                  <span className="text-white text-sm font-semibold">
                    Subscribe
                  </span>
                </button>
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <button className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                <AiOutlineLike className="text-white text-[20px] mr-2" />
                <span className="text-white text-sm font-semibold">
                  {abbreviateNumber(video?.stats?.likes, 2)}
                </span>
              </button>

              <button className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-3">
                <AiOutlineDislike className="text-white text-[20px] mr-2" />
                <span className="text-white text-sm font-semibold">
                  {abbreviateNumber(video?.stats?.likes, 2)}
                </span>
              </button>
            </div>
          </div>
          {/* description */}
          <div className="text-white bg-gray-700 text-sm mt-4 p-5  rounded-2xl">
            <p className="line-clamp-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium vel nobis sequi, corporis esse consequuntur saepe ab architecto, ullam tenetur voluptas, assumenda laborum labore sunt. Odit dolore labore adipisci ad error reprehenderit deserunt ex aperiam, reiciendis vitae soluta cumque eum porro, corporis asperiores non. Voluptate iste aperiam debitis! Laboriosam ducimus alias commodi rem vitae quidem at, a pariatur, sapiente quod enim animi corrupti. Saepe alias impedit illo obcaecati voluptate eos. Recusandae esse eaque odio illum perspiciatis sint possimus architecto facere asperiores tempora excepturi iste voluptas saepe mollitia, ad, quaerat ipsum dolorum molestiae. Numquam aspernatur aut, neque totam vel optio eaque.</p>
          </div>
          <Comments/>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
