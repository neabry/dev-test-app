import { Response, Request } from "express"
import { FlickrEndpoint } from "../types/flickr";
import axios, { AxiosResponse } from "axios";

const jsonpAdapter = require("axios-jsonp");

// Grabs image from Flickr's image search API
export const getFlickrPhotos = async (req: Request, res: Response): Promise<void> => {

  const query = req.query.q as string;

  try {
    const { data }: AxiosResponse<FlickrEndpoint> = await axios.get(`https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags=${encodeURIComponent(query)}`, {
      adapter: jsonpAdapter,
      // @ts-ignore axios not supporting safe type extension of AxiosRequestConfig
      callbackParamName: "jsonFlickrFeed",
    });

    // Check we have an image to return
    if (data?.items.length > 0) {
      res.status(200).json({
        status: 200,
        media: data.items[0].media.m
      })
    } else {
      res.status(404).json({
        status: 404,
        media: data.items[0].media.m
      })
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: "Flickr is down right now.",
    })
  }

};
