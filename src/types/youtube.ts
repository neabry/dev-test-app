interface YouTubeSearchResult {
  id: YouTubeId;
  kind: string;
  snippet: YouTubeSnippet;
}

interface YouTubeId {
  kind: string;
  videoId: string;
  channelId: string;
  playlistId: string;
}

interface YouTubeSnippet {
  publishedAt: string;
  channelTitle: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeSearchResultThumbnails;
}
interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}
interface YouTubeSearchResultThumbnails {
  default?: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}
export interface YouTubeEndpoint {
  totalResults: number;
  resultsPerPage: number;
  nextPageToken: string;
  prevPageToken: string;
  items: YouTubeSearchResult[];
}
