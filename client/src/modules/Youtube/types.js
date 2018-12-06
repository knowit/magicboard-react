export type Video = {
  title: string,
  views: number,
  likes: number,
  description: string,
  thumbnail: string,
};

export type Props = {
  row?: string,
  column?: string,
  channelId: string,
  maxVideos: number,
};

export type State = {
  playlistName: string,
  totalViews: number,
  totalLikes: number,
  videos: Video[],
};
