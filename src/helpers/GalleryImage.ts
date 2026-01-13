import { GalleryImage } from "../types";

export const toGalleryImage = (img: any): GalleryImage => ({
  ...img,
  description: undefined,
  display_order: 999,
  is_featured: false,
  created_at: new Date().toISOString(),
});
