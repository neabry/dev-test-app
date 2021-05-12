import { Response, Request } from "express"
import { FlickrEndpoint } from "../types/flickr";
import axios, { AxiosResponse } from "axios";

// Grabs image from Flickr's image search API
export const getFlickrPhotos = async (req: Request, res: Response): Promise<void> => {

  const query = req.query.q as string;

  try {
    const { data }: AxiosResponse = await axios.get(`https://www.flickr.com/services/feeds/photos_public.gne`, {
      params: {
        format: "json",
        tags: encodeURIComponent(query),
      }
    });
    // Remove jsonp information
    const json: FlickrEndpoint = JSON.parse(data.replace(/^jsonFlickrFeed\(|\)$/g, ''));

    // Check we have an image to return
    if (json.items.length > 0) {
      res.status(200).json({
        status: 200,
        media: json.items[0].media.m,
      })
    } else {
      res.status(404).json({
        status: 404,
        media: "No image was found relating to tags",
      })
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: "Flickr is down right now.",
    })
  }

};
