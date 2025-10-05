import { Component } from "react";
import Searchbar from "./components/Searchbar/Searchbar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Button from "./components/Button/Button.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Modal from "./components/Modal/Modal.jsx";
import { Box } from "./App.js";

const API_KEY = "50072628-8f6f62aa1cc293b82b9b384d5";
const PER_PAGE = 12;

export default class App extends Component {
  state = {
    query: "",
    images: [],
    page: 1,
    loading: false,
    modal: null,
  };

  fetchImages = (newQuery = this.state.query, newPage = this.state.page) => {
    if (!newQuery) return;
    this.setState({ loading: true });

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${newQuery}&page=${newPage}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState(prev => ({
          images: newPage === 1 ? data.hits : [...prev.images, ...data.hits],
          loading: false,
        }));
      })
      .catch(err => {
        console.error("Fetch error:", err);
        this.setState({ loading: false });
      });
  };

  handleSearch = query => {
    this.setState({ query, page: 1 }, () => {
      this.fetchImages(query, 1);
    });
  };

  handleLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.setState({ page: nextPage }, () => {
      this.fetchImages(this.state.query, nextPage);
    });
  };

  render() {
    const { images, loading, modal } = this.state;

    return (
      <Box>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onClick={modal => this.setState({ modal })} />
        {loading && <Loader />}
        {images.length > 0 && !loading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {modal && <Modal img={modal} onClose={() => this.setState({ modal: null })} />}
      </Box>
    );
  }
}
