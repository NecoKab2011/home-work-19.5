import { useState, useEffect, useCallback } from "react";
import Searchbar from "./components/Searchbar/Searchbar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Button from "./components/Button/Button.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Modal from "./components/Modal/Modal.jsx";
import { Box } from "./App.js";

const API_KEY = "50072628-8f6f62aa1cc293b82b9b384d5";
const PER_PAGE = 12;

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  const fetchImages = useCallback(async () => {
    if (!query) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      const data = await res.json();
      setImages((prev) => (page === 1 ? data.hits : [...prev, ...data.hits]));
    } catch (err) {
      console.error("Помилка запиту:", err);
    } finally {
      setLoading(false);
    }
  }, [query, page]); 

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => setPage((prev) => prev + 1);
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
      {showModal && <Modal largeImageURL={largeImageURL} onClose={closeModal} />}
    </Box>
  );
}
