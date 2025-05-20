import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../Api/Api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "../../types/types";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleSubmit = (newQuery: string): void => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setNoResults(false);
    setTotalPages(1);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async (): Promise<void> => {
      setLoading(true);
      try {
        const { results, totalPage } = await api(query, page);
        if (results.length === 0) {
          setNoResults(true);
        } else {
          setImages((prev) => [...prev, ...results]);
          setNoResults(false);
        }
        setTotalPages(totalPage);
      } catch {
        setError("Failed to load images");
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const loadMore = (): void => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    } else {
      const message: string = "You've reached the end of the pages.";
      toast(message);
    }
  };
  const openModal = (image: Image): void => {
    setSelectedImage(image);
    setIsOpenModal(true);
  };

  const closeModal = (): void => {
    setIsOpenModal(false);
    setSelectedImage(null);
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message={error} />}
      {noResults && !loading && (
        <ErrorMessage message="No images found for this query((" />
      )}
      {images.length > 0 && (
        <>
          <ImageGallery gallery={images} openModal={openModal} />
          {loading ? <Loader /> : <LoadMoreBtn onClick={loadMore} />}
        </>
      )}
      {loading && images.length === 0 && <Loader />}
      <ImageModal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </>
  );
};

export default App;
