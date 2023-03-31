import React, { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../utils/firebase";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(undefined);
  const [imageFile, setImageFile] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const [formData, setForm] = useState({
    title: "",
    des: "",
    imgUrl: "",
    videoUrl: "",
  });

  const uploadFile = async (e, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + e.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, e);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setForm((prev) => ({ ...prev, [urlType]: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    videoFile && uploadFile(videoFile, "videoUrl");
  }, [videoFile]);
  useEffect(() => {
    imageFile && uploadFile(imageFile, "imgUrl");
  }, [imageFile]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const res = await api.post("/video/", { ...formData, tags });
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  return (
    <div className="flex flex-row h-[calc(100%-56px)] ">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full">
        <section className="bg-black">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-black rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-600 shadow-2xl shadow-slate-900">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Upload Video a new video
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={onSubmitForm}
                  encType="multipart/form-data"
                >
                  <div>
                    <label
                      htmlFor="videoFile"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Video
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      name="videoFile"
                      id="videoFile"
                      placeholder="Enter your username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setVideoFile(e.target.files[0])}
                    />
                    {videoPerc > 0 && (
                      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-auto mt-1 transition-all duration-500 ease-in-out">
                        <div
                          style={{ width: videoPerc + "%" }}
                          className={videoPerc == 100 ? "bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-500 ease-in-out" : "bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-500 ease-in-out"}
                        >
                          {videoPerc == 100 ? "Uploaded" : videoPerc + "%"}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Video Title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.title}
                      onChange={onChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      name="des"
                      id="description"
                      placeholder="Video Description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      rows="5"
                      value={formData.description}
                      onChange={onChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="tags"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      placeholder="Video Tags"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={handleTags}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="thumbnail"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Thumbnail
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="thumbnail"
                      id="thumbnail"
                      placeholder="Enter your username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.thumbnail}
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    {imgPerc > 0 && (
                      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-auto mt-1 transition-all duration-500">
                        <div
                          style={{ width: imgPerc + "%" }}
                          className={imgPerc == 100 ? "bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" : "bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"}
                        >
                          {imgPerc == 100 ? "Uploaded" : imgPerc + "%"}
                          </div>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
                    disabled={
                      formData.imgUrl === "" || formData.videoUrl === "" || formData.title === "" || formData.des === "" || tags == [] || formData.thumbnail === ""
                    }
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UploadVideo;
