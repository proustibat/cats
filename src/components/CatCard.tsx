import { ReactElement, useEffect, useState, MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import classnames from "classnames";
import { fetchBreed, fetchImage, ICatBreed, QUERY_KEY, TImageItem } from "../apis/the-cat";
import Image from "./Image";
import CloseButton from "./CloseButton.tsx";
import loader from "../assets/loader.gif";
import fonts from "../styles/modern-fonts.module.css";
import styles from "../styles/CatCard.module.css";
import Rate from "./Rate.tsx";

interface CatCardProps {
   id: string;
   onClose: () => void;
   onNav: ( direction: "prev" | "next" ) => void;
}

const CatCard = ( { id, onClose, onNav }: CatCardProps ): ReactElement => {
    const [ imageId, setImageId ] = useState<string | null>( null );

    const { isPending, error, data, isFetching, isFetched } = useQuery<ICatBreed, Error>( {
        queryKey: [ QUERY_KEY.BREED, id ],
        queryFn: fetchBreed( id ),
    } );

    const { isPending: isPendingImage, data: dataImage, isFetching: isFetchingImage } = useQuery<TImageItem, Error>( {
        queryKey: [ QUERY_KEY.IMAGE, id ],
        queryFn: fetchImage( imageId ),
        select: ( data: TImageItem ) => ( { url: data.url } ),
        enabled: !!imageId
    } );

    useEffect( () => {
        if( isFetched && data?.reference_image_id ) {
            setImageId( data.reference_image_id );
        }
    }, [ isFetched, data?.reference_image_id ] );
    
    const handleNavClick = ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        onNav( e.currentTarget.value as "prev" | "next" );
    };

    if( isFetching || isPending || ( ( isFetchingImage || isPendingImage ) && data?.reference_image_id ) ) {
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
                    <div className={styles.navContainerWithImage}>
                        <CloseButton onClose={onClose}/>
                        {dataImage?.url && <Image className={styles.image} url={dataImage.url}/>}
                        <div className={styles.nav}>
                            <button onClick={handleNavClick} value="prev" type="button">&#8592;</button>
                            <button onClick={handleNavClick} value="next" type="button">&#8594;</button>
                        </div>
                    </div>
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
                    {imageId && <Rate imageId={imageId}/>}
                </section>
            )}
        </>
    );
};

export default CatCard;