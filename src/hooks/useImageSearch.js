import { useState, useEffect, useCallback } from "react";

const API_KEY = "50072628-8f6f62aa1cc293b82b9b384d5";
const PER_PAGE = 12;

export function useImageSearch(query, page) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      const data = await res.json();

      setImages(prev =>
        page === 1 ? data.hits : [...prev, ...data.hits]
      );
    } catch (err) {
      console.error("Помилка запиту:", err);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, loading, setImages };
}