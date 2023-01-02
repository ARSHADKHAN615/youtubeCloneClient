import React from "react";

const Comment = () => {
  return (
    <div className="m-4">
      <div className="flex flex-col ml-4">
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full object-cover mr-2"
            src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"
          />
          <h1 className="text-sm font-semibold text-white">John Doe</h1>
          <span className="text-xs text-gray-400 ml-2">1 day ago</span>
        </div>
        <p className="text-sm text-gray-300 mt-1 line-clamp-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, ex
          laboriosam ipsam aliquam voluptatem perferendis provident modi, sequi
          tempore reiciendis quod, optio ullam cumque? Quidem numquam sint
          mollitia totam reiciendis?
        </p>
      </div>
    </div>
  );
};

export default Comment;
