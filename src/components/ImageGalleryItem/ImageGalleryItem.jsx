import { ImageGalleryItems, ImageGalleryItemImage } from "./ImageGalleryItem"

export default function ImageGalleryItem({ small, large, onClick }) {
  return (
    <ImageGalleryItems onClick={() => onClick(large)}>
      <ImageGalleryItemImage src={small} alt="" />
    </ImageGalleryItems>
  );
}