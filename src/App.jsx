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
    showModal: false,
    largeImageURL: "",
  };

  componentDidMount() {
    console.log("App змонтовано");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  componentWillUnmount() {
    console.log("Компонент App буде видалено");
  }

  fetchImages = () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ loading: true });

    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState((prev) => ({
          images: page === 1 ? data.hits : [...prev.images, ...data.hits],
        }));
      })
      .catch((err) => {
        console.error("Помилка запиту:", err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  handleSearch = (query) => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }));
  };

  openModal = (url) => {
    this.setState({
      showModal: true,
      largeImageURL: url,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: "",
    });
  };

  render() {
    const { images, loading, showModal, largeImageURL } = this.state;

    return (
      <Box>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && !loading && <Button onClick={this.loadMore} />}
        {showModal && <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />}
      </Box>
    );
  }
}
