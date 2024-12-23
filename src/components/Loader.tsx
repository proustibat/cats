import { ReactElement } from "react";
import { API_TYPE } from "../apis/the-cat.ts";

let source: string;
import( `../assets/${ API_TYPE === "dogs" ? "dog" : "cat" }.gif` ).then( ( module ) => {
    source = module.default;
} );

const Loader = (): ReactElement => {
    return <img width="64" height="64" src={source} alt="loading..." />;
};

export default Loader;