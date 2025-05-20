import Modal from "react-modal";
import React, { useEffect } from "react";
import css from "./ImageModal.module.css";
import { Image } from "../../types/types";

Modal.setAppElement("#root");

interface ImageModalProps {
  image: Image | null;
  isOpen: boolean;
  onRequestClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  isOpen,
  onRequestClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onRequestClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRequestClose]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
      className={css.modal}
    >
      {image?.urls?.regular && (
        <div>
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Image"}
          />
          <p>
            <strong>Author:</strong> {image.user?.first_name}{" "}
            {image.user?.last_name || "Unknown"}
          </p>
          {image.user?.location && (
            <p>
              <strong>Location:</strong> {image.user.location}
            </p>
          )}
          <p>
            <strong>Likes:</strong> {image.likes}
          </p>
          {image.description && (
            <p>
              <strong>Description:</strong> {image.description}
            </p>
          )}
          {image.user?.portfolio_url && (
            <p>
              <strong>Portfolio:</strong>
              <a
                href={image.user.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {image.user.portfolio_url}
              </a>
            </p>
          )}
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
