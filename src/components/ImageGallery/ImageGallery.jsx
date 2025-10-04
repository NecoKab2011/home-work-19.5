import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem.jsx";
import { ImageGalleryList } from "./ImageGallery.js"


export default function ImageGallery({ images, onClick }) {
  return (
    <ImageGalleryList>
      {images.map(img => (
        <ImageGalleryItem
          key={img.id}
          small={img.webformatURL}
          large={img.largeImageURL}
          onClick={onClick}
        />
      ))}
    </ImageGalleryList>
  );
}