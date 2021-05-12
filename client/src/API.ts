import axios , { AxiosResponse } from "axios";
import { FlickrEndpoint } from "./types/flickr";
import { YouTubeEndpoint, YouTubeVideo } from "./types/youtube";

const BASE_URL = "localhost:4000/api";

/**
 * Return YouTube videos matching a query
 */
const getYoutube = async (query: string): Promise<YouTubeVideo[]> => {

  const { data } : AxiosResponse<YouTubeEndpoint> = await axios.get(BASE_URL + "/youtube", {
    params: {
      q: query,
    }
  });

  return data.videos ?? [];
}

/**
 * Return images matching a query
 */
const getFlickr = async (query: string): Promise<string[]> => {

  const { data } : AxiosResponse<FlickrEndpoint> = await axios.get(BASE_URL + "/flickr", {
    params: {
      q: query,
    }
  });

  return data.media ?? [];
}

export { getFlickr, getYoutube };
