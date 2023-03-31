import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsBell, BsFillCheckCircleFill } from "react-icons/bs";
import {
  AiFillBell,
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestionVideoCard from "./SuggestionVideoCard";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  api,
  getChannelDetails,
  getRecommendVideos,
  getVideoDetails,
} from "../api/index";
import { loginSuccess } from "../slices/userSlice";

const VideoDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  // Video Views
  const addView = async () => {
    await api.put(`video/view/${id}`);
  };
  useEffect(() => {
    addView();
  }, [id]);
  
  // Video Details
  const { data: video, isLoading } = useQuery({
    queryKey: ["videoDetail", id],
    queryFn: async () => getVideoDetails(id),
  });

  const videoUserId = video?.userId;
  // Channel Details
  const { data: channel } = useQuery({
    queryKey: ["channelDetails", videoUserId],
    queryFn: async () => getChannelDetails(videoUserId),
    enabled: !!videoUserId,
  });

  const videoTags = video?.tags;

  const { data: recommend } = useQuery({
    queryKey: ["recommendVideo", videoUserId],
    queryFn: async () => getRecommendVideos(videoTags),
    enabled: !!videoTags,
  });

  const { mutate: likeMutation, isLoading: likeBtn } = useMutation({
    mutationFn: async () => {
      return await api.put(`user/like/${id}`, { userId: currentUser?._id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["videoDetail"]);
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const { mutate: dislikeMutation, isLoading: dislikeBtn } = useMutation({
    mutationFn: async () => {
      return await api.put(`/user/dislike/${id}`, { userId: currentUser?._id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["videoDetail"]);
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const { mutate: subscribeMutation, isLoading: subscribeBtn } = useMutation({
    mutationFn: async (channelId) => {
      await api.put(`user/sub/${channelId}`);
      const { data } = await api.get(`user/find/${currentUser._id}`);
      dispatch(loginSuccess(data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["channelDetails"]);
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const { mutate: unsubscribeMutation, isLoading: unsubscribeBtn } =
    useMutation({
      mutationFn: async (channelId) => {
        await api.put(`user/unSub/${channelId}`);
        const { data } = await api.get(`user/find/${currentUser._id}`);
        dispatch(loginSuccess(data));
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["channelDetails"]);
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    });

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
          <div className="ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <video
              className="w-full h-[calc(100%-56px)] object-cover"
              src={video?.videoUrl}
              controls
            />
          </div>
          {isLoading ? (
            <div className="text-white font-bold text-sm md:text-xl mt-4">
              Loading...
            </div>
          ) : (
            <>
              <div className="text-white font-bold text-sm md:text-xl mt-4">
                {video?.title}
              </div>
              <div className="flex text-[12px] font-semibold text-white/[0.7] ">
                <span>{`${abbreviateNumber(video?.views?.length, 2)} views`}</span>
                <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                  .
                </span>
                <span className="truncate">{format(video?.createdAt)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={
                      channel?.img
                        ? channel.img
                        : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${channel?.name}`
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {channel?.name}{" "}
                  <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  {/* {video?.author?.badges[0]?.type ===
                                "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                            )} */}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {channel?.subscribers} subscribers
                </div>
              </div>
              <div className="flex ml-3">
                {currentUser?.subscribedUser?.includes(channel?._id) ? (
                  <button
                    className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/50 disabled:opacity-50"
                    onClick={() => unsubscribeMutation(channel?._id)}
                    disabled={unsubscribeBtn}
                  >
                    <AiFillBell className="text-white text-[20px] mr-2" />
                    <span className="text-white text-sm font-semibold">
                      Subscribed
                    </span>
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/50 disabled:opacity-50"
                    onClick={() => subscribeMutation(channel?._id)}
                    disabled={subscribeBtn}
                  >
                    <BsBell className="text-white text-[20px] mr-2" />
                    <span className="text-white text-sm font-semibold">
                      Subscribe
                    </span>
                  </button>
                )}
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <button
                className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/50 disabled:opacity-50"
                onClick={() => likeMutation()}
                disabled={likeBtn}
              >
                {video?.likes?.includes(currentUser?._id) ? (
                  <AiFillLike className="text-white text-[20px] mr-2" />
                ) : (
                  <AiOutlineLike className="text-white text-[20px] mr-2" />
                )}
                <span className="text-white text-sm font-semibold">
                  {abbreviateNumber(video?.likes?.length, 2)}
                </span>
              </button>

              <button
                className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/50 ml-3 disabled:opacity-50"
                onClick={() => dislikeMutation()}
                disabled={dislikeBtn}
              >
                {video?.dislikes?.includes(currentUser?._id) ? (
                  <AiFillDislike className="text-white text-[20px] mr-2" />
                ) : (
                  <AiOutlineDislike className="text-white text-[20px] mr-2" />
                )}
                <span className="text-white text-sm font-semibold">
                  {abbreviateNumber(video?.dislikes?.length, 2)}
                </span>
              </button>
            </div>
          </div>
          {/* description */}
          <div className="text-white bg-gray-700 text-sm mt-4 p-5  rounded-2xl">
            <p className="line-clamp-3">{video?.des}</p>
          </div>
          <Comments videoId={video?._id} />
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
          {recommend?.length === 0 && (
            <div className="text-white text-sm font-semibold">
              No recommendations
            </div>
          )}
          {recommend?.map((item, index) => {
            return <SuggestionVideoCard key={index} video={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
