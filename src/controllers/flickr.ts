/* eslint-disable import/prefer-default-export */
import { Response, Request } from 'express';
import axios, { AxiosResponse } from 'axios';
import { FlickrEndpoint } from '../types/flickr';

// Shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Grab images from Flickr's API
 */
export const getFlickrPhotos = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;

  try {
    const { data }: AxiosResponse<FlickrEndpoint> = await axios.get('https://www.flickr.com/services/feeds/photos_public.gne', {
      params: {
        format: 'json',
        tags: query,
        nojsoncallback: 1, // Remove function wrapper
      },
    });

    // Shuffle array
    shuffleArray(data.items);
    const medias = data.items.slice(0, 3);

    res.status(200).json({
      status: 200,
      media: medias.map((media) => media.media.m),
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: 'Flickr is down right now.',
    });
  }
};
