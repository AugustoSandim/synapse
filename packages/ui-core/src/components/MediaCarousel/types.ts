export interface MediaItem {
  id: string;
  title: string;
  duration: string;
}

export interface MediaCarouselProps {
  id?: string;
  headline: string;
  items?: MediaItem[];
}
