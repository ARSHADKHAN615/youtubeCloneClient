import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Comment from "./Comment";
import { api } from "../api";
import { useSelector } from "react-redux";
import { useState } from "react";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.User);
  const queryClient = useQueryClient();
  const [formData, setForm] = useState({
    des: "",
    videoId: videoId,
  });

  const onChange = (e) => {
    setForm({ ...formData, videoId, [e.target.name]: e.target.value });
  };

  const { isLoading, data } = useQuery({
    queryKey: ["comments", videoId],
    queryFn: async () => {
      const { data } = await api.get(`comment/${videoId}`);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      return await api.post("comment", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      formData.des = "";
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center my-5">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={
              currentUser?.img
                ? currentUser.img
                : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${currentUser?.name}`
            }
          />
          <input
            placeholder="Add a comment..."
            className="bg-transparent ml-3 w-full text-white p-1 focus:outline-none focus:border-white border-b-2 border-gray-700"
            type="text"
            name="des"
            value={formData.des}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center justify-between my-5">
          <div></div>
          <div>
            <button
              className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-semibold"
              type="reset"
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-black px-3 py-1 rounded-md text-sm font-semibold ml-2"
              type="submit"
            >
              Post
            </button>
          </div>
        </div>
      </form>
      {data?.length === 0 && (
        <div className="text-white">
          No comments yet. Be the first to comment!
        </div>
      )}
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        data.map((comment) => <Comment key={comment._id} comment={comment} />)
      )}
    </div>
  );
};

export default Comments;
