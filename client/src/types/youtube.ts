export interface YouTubeEndpoint {
  status: number;
  error?: string;
  videos?: YouTubeVideo[];
}

export interface YouTubeVideo {
  title: string;
  link: string;
}
