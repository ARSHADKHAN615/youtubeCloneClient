import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  credentials: "include",
});


export const getChannelDetails = async (id) => {
    const { data } = await api.get(`user/find/${id}`);
    return data;
};
    
export const getVideoDetails = async (id) => {
    const { data } = await api.get(`video/find/${id}`);
    return data;
};
export const getRecommendVideos = async (tags) => {
  const query = tags.join(",");
  const { data } = await api.get(`video/tags?tags=${query}`);
  return data;
}
