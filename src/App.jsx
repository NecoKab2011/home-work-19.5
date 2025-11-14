import { useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Button from "./components/Button/Button.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Modal from "./components/Modal/Modal.jsx";
import { Box } from "./App.js";
import { useImageSearch } from "./hooks/useImageSearch.js"

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  const { images, loading, setImages } =  useImageSearch(query, page);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => setPage(prev => prev + 1);

  const openModal = (url) => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL("");
  };

  return (
    <Box>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={loadMore} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </Box>
  );
}
