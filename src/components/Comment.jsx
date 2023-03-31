import React from "react";
import { format } from "timeago.js";
import { api, getChannelDetails } from "../api";

const Comment = ({ comment }) => {
  const [commentUser, setCommentUser] = React.useState(null);
  const getUser = async () => {
    try {
      getChannelDetails(comment.userId).then((data) => {
        setCommentUser(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, [comment._id]);

  return (
    <div className="m-4 my-8">
      <div className="flex flex-col ml-4">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full object-cover mr-2"
            src={
              commentUser?.img
                ? commentUser?.img
                : `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${commentUser?.name}`
            }
          />
          <div>
            <span className="flex items-center">
              <h1 className="text-sm font-semibold text-white">
                {commentUser?.name}
              </h1>
              <span className="text-xs text-gray-400 ml-2">
                {format(comment?.createdAt)}
              </span>
            </span>
            <p className="text-sm text-gray-300 mt-1 line-clamp-2">
              {comment.des}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
