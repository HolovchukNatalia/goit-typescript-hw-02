import React from "react";
import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div>
      <p className={css.message}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
