import { useState, useEffect } from "react";
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
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
        );
        const { hits } = await response.json();

        setImages((prev) => (page === 1 ? hits : [...prev, ...hits]));
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const openModal = (url) => setModalImg(url);
  const closeModal = () => setModalImg(null);

  return (
    <Box>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={handleLoadMore} />}
      {modalImg && <Modal img={modalImg} onClose={closeModal} />}
    </Box>
  );
}
