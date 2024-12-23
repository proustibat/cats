import { ReactElement } from "react";
import { API_TYPE } from "../apis/the-cat.ts";
import dogGif from "../assets/dog.gif";
import catGif from "../assets/cat.gif";

const Loader = (): ReactElement => {
    return <img
        width="64"
        height="64"
        src={API_TYPE === "dogs"
            ? dogGif
            : catGif}
        alt="loading..."
    />;
};

export default Loader;