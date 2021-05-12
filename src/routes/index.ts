import { Router, Request, Response, NextFunction } from "express"
import { getFlickrPhotos } from "../controllers/flickr";
import { getYoutubeVideos } from "../controllers/youtube";

const router: Router = Router()

/**
 * Validate query parameters prior to passing to controllers
 */
router.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.query.q) {
    res.status(400).json({
      status: 400,
      error: `Missing "q" query parameter.`
    });
  } else {
    next();
  }
});

router.get("/youtube", getYoutubeVideos);

router.get("/flickr", getFlickrPhotos)

export default router
