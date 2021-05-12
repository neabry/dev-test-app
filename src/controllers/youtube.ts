import { Response, Request } from "express"
import { YouTubeEndpoint } from "../types/youtube";
import axios, { AxiosResponse } from "axios";

if (!process.env.YOUTUBE_KEY) {
  console.warn("YOUTUBE_KEY is not defined in .env!");
}

export const getYoutubeVideos = async (req: Request, res: Response): Promise<void> => {

  const query = req.query.q as string;

  try {
    const { data }: AxiosResponse<YouTubeEndpoint> = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
      params: {
        part: "snippet",
        maxResults: 25,
        q: encodeURIComponent(query),
        key:process.env.YOUTUBE_KEY,
        type: "video",
      }
    });

    // Check we have an image to return
    if (data.items.length > 0) {
      res.status(200).json({
        status: 200,
        videos: data.items.map(item => ({ title: item.snippet.title, link: `https://www.youtube.com/watch?v=${item.id.videoId}` })),
      });
    } else {
      res.status(404).json({
        status: 404,
        error: "No videos were found relating to query.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: "YouTube is down right now.",
    });
  }
};
