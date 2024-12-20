import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import loader from "../assets/loader.gif";

import { fetchBreed, fetchImage, ICatBreed, TImageItem } from "../apis/the-cat";
import Image from "./Image";
import classnames from "classnames";
import styles from "../styles/CatCard.module.css";
import fonts from "../styles/modern-fonts.module.css";
import CloseButton from "./CloseButton.tsx";

interface CatCardProps {
   id: string;
   onClose: () => void;
}

const CatCard = ( { id, onClose }: CatCardProps ): ReactElement => {
    const [ imageId, setImageId ] = useState<string | null>( null );


    const { isPending, error, data, isFetching, isFetched } = useQuery<ICatBreed, Error>( {
        queryKey: [ 'breed', id ],
        queryFn: fetchBreed( id ),
    } );

    const { isPending: isPendingImage, data: dataImage, isFetching: isFetchingImage } = useQuery<TImageItem, Error>( {
        queryKey: [ 'image', id ],
        queryFn: fetchImage( imageId ),
        select: ( data: TImageItem ) => ( { url: data.url } ),
        enabled: !!imageId
    } );

    useEffect( () => {
        if( isFetched && data?.reference_image_id ) {
            setImageId( data.reference_image_id );
        }
    }, [ isFetched, data?.reference_image_id ] );

    if( isFetching || isPending || isFetchingImage || isPendingImage ) {
        return <div id="" className={styles.loading}>
            <img src={loader} alt="loading..." />
        </div>;
    }
    if( error ) {
        return <div className={styles.loading}>ERROR IMAGE</div>;
    }

    return (
        <>
            {data && (
                <section className={styles.container}>
                    <CloseButton onClose={ onClose} />
                    {dataImage?.url && <Image className={styles.image} url={dataImage.url}/>}
                    <p className={classnames( fonts.systemUi, styles.origin )}>UNITED STATES</p>
                    <h2 className={classnames( fonts.humanist, styles.name )}>
                        <span>{data.name}</span>
                        {data.alt_names && <span>(also called {data.alt_names})</span>}
                    </h2>
                    <p className={styles.description}>{data.description}</p>
                    <p className={styles.temperament}>
                        <span>Temperament</span>
                        <span>{data.temperament}</span>
                    </p>
                </section>
            )}
        </>
    );
};

export default CatCard;