import { Router, Request, Response, NextFunction } from "express"
import { getFlickrPhotos } from "../controllers/flickr";
import { getYoutubeVideos } from "../controllers/youtube";

// Set arbitrary length on query param limits
const QUERY_LIMIT_LENGTH = 300


const router: Router = Router()

/**
 * Middleware validating query parameters prior to passing to controllers
 */
router.use((req: Request, res: Response, next: NextFunction) => {

  const query = req.query.q as string | undefined;

  // Query existence
  if (!query) {
    res.status(400).json({
      status: 400,
      error: `Missing "q" query parameter.`,
    });
    return;
  }

  // Query length enforcement
  if (query.length > QUERY_LIMIT_LENGTH) {
    res.status(400).json({
      status: 400,
      error: `"q" query parameter exceeds enforced length.`,
    });
    return;
  }

  next();
});

router.get("/youtube", getYoutubeVideos);

router.get("/flickr", getFlickrPhotos)

export default router
