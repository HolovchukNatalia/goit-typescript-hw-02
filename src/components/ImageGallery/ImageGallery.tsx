import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGalery.module.css";
import { Image } from "../../types/types";

interface ImageGalleryProps {
  gallery: Image[];
  openModal: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ gallery, openModal }) => {
  return (
    <ul className={css.gallery}>
      {gallery.map((image) => (
        <li key={image.id} className={css.card}>
          <ImageCard image={image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
