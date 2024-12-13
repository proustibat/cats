import { ReactNode } from "react";

interface ImageProps {
   url: string;
   className?: string;
}

const Image = ( { url, className="" }: ImageProps ): ReactNode => {


    return <img
        alt=""
        loading="lazy"
        className={className}
        src={url}
    />;

};

export default Image;