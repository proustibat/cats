import { ReactElement, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBreed, fetchImage, ICatBreed, TImageItem } from "../apis/the-cat";
import Image from "./Image";
import classnames from "classnames";
import styles from "../styles/CatCard.module.css";
import fonts from "../styles/modern-fonts.module.css";

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
        return <div className={styles.loading}>LOADING DATA ...</div>;
    }
    if( error ) {
        return <div className={styles.loading}>ERROR IMAGE</div>;
    }

    return (
        <>
            {data && (
                <section className={styles.container}>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        <img
                            style={{ position: "absolute", left: "0.35rem", top: "0.25rem", width: "1.3rem", height: "1.3rem" }}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABBUlEQVR4nO3ZTQqDMBAF4HeKPOkV2+MWbE9jKXUhRcQk8xeZt3Il8xFNZgiQyWQyV8odwORdBH41fGtpygPAAmB2xkxrDctaU3UKgOf6gjeAG+zDTQ2vnho8MZRCeGIojfDAUAthiaE2wgJjhtDEmCM0MG4ISYw7QgITBtGDCYdowYRF1GDCI85ghkEcYYZD7M0Q899zhEGteWWGW4lttp+T53DWlUt8Wtz5sSOMzVU52p2GwfDEFhsew4pzIiyGDYddOAw7TuwwGAq0He4YCvZObhgqNIDmGCp2sWYYi1a8aGMs54mihfEYioo0xnOyK1KYCONpkcBc5urtMpehmUwmg3D5AAklyc9YEtl/AAAAAElFTkSuQmCC"
                            alt="close"
                        />
                    </button>
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