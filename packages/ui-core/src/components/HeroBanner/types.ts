export interface HeroBannerAction {
  url: string;
  label?: string;
}

export interface HeroBannerProps {
  id?: string;
  title: string;
  badge?: string;
  action?: HeroBannerAction;
}
