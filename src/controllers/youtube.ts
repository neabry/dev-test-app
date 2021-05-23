/* eslint-disable import/prefer-default-export */
import { Response, Request } from 'express';
import axios, { AxiosResponse } from 'axios';
import { YouTubeEndpoint } from '../types/youtube';

if (!process.env.YOUTUBE_KEY) {
  console.warn('YOUTUBE_KEY is not defined in environment variables!');
}

export const getYoutubeVideos = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;

  try {
    const { data }: AxiosResponse<YouTubeEndpoint> = await axios.get('https://youtube.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 25,
        q: query,
        key: process.env.YOUTUBE_KEY,
        type: 'video',
        videoDuration: 'short',
      },
    });

    res.status(200).json({
      status: 200,
      videos: data.items.map((item) => ({ title: item.snippet.title, link: `https://www.youtube.com/watch?v=${item.id.videoId}` })),
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: 'YouTube is down right now.',
    });
  }
};
