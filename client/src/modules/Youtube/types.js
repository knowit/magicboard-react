export type Video = {
  title: string,
  views: number,
  likes: number,
  thumbnail: string,
  duration: string,
};

export type Props = {
  row?: string,
  column?: string,
  channelId: string,
  maxVideos: number,
  minLength: number,
};

export type State = {
  playlistName: string,
  totalViews: number,
  totalLikes: number,
  videos: Video[],
};
