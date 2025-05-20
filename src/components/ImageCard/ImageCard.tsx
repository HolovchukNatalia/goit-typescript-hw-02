import React from "react";
import { Image } from "../../types/types";

const ImageCard: React.FC<{
  image: Image;
  openModal: (image: Image) => void;
}> = ({ image, openModal }) => {
  if (!image?.urls?.small) return null;

  return (
    <div>
      <img
        width="300"
        onClick={() => openModal(image)}
        src={image.urls.small}
        alt={image.alt_description || "Image"}
      />
    </div>
  );
};
export default ImageCard;
