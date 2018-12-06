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
};

export type State = {
  playlistName: string,
  totalViews: number,
  videos: Video[],
};
