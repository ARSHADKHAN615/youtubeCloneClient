import Comment from "./Comment";

const Comments = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center my-5">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"
        />
        <input
          placeholder="Add a comment..."
          className="bg-transparent ml-3 w-full text-white p-1 focus:outline-none focus:border-white border-b-2 border-gray-700"
        />
      </div>
      <div className="flex items-center justify-between my-5">
        <div></div>
        <div>
          <button className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-semibold">
            Cancel
          </button>
          <button className="bg-blue-500 text-black px-3 py-1 rounded-md text-sm font-semibold ml-2">
            Post
          </button>
        </div>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;
