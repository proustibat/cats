import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchImage, TImageItem } from "../apis/the-cat";
import styles from "../styles/Image.module.css";
import classNames from "classnames";

interface ImageProps {
   id: string;
   className?: string;
}

const Image = ( { id, className="" }: ImageProps ): ReactNode => {
    const { isPending, error, data, isFetching } = useQuery<TImageItem, Error>( {
        queryKey: [ 'image', id ],
        queryFn: fetchImage( id ),
        select: ( data: TImageItem ) => ( { url: data.url } )
    } );

    if( isFetching || isPending ) {
        return <div className={classNames( styles.img, className )}>"LOADING ..."</div>;
    }
    if( error ) {
        return null;
    }

    return data ? <img className={className} src={data.url} alt="" /> : null;
};

export default Image;