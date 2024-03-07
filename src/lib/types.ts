// Type definitions.

export type Song = {
  name: string;
  artist: string;
};

export interface QueueItem {
  name: string;
  song: Song;
  key: string;
  image?: File | null;
}

