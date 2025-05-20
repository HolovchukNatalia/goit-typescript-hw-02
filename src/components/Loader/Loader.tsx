import React from "react";
import { FadeLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={css.loaderWrap}>
      <FadeLoader color="#535353" height={15} width={5} margin={2} radius={2} />
    </div>
  );
};

export default Loader;
