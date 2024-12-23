import { ReactElement, MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import classnames from "classnames";
import { fetchBreed, type ICatBreed, type TImageItem, QUERY_KEY } from "../apis/the-cat";
import Image from "./Image";
import CloseButton from "./CloseButton.tsx";
import Loader from "./Loader";
import fonts from "../styles/modern-fonts.module.css";
import styles from "../styles/CatCard.module.css";
import Rate from "./Rate.tsx";

interface CatCardProps {
   id: string;
   onClose: () => void;
   onNav: ( direction: "prev" | "next" ) => void;
}

const CatCard = ( { id, onClose, onNav }: CatCardProps ): ReactElement => {
    const { isPending, error, data, isFetching } = useQuery<{breed: ICatBreed, image?: TImageItem}, Error>( {
        queryKey: [ QUERY_KEY.BREED, id ],
        queryFn: fetchBreed( id ),
    } );
    
    const handleNavClick = ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        onNav( e.currentTarget.value as "prev" | "next" );
    };

    if( isFetching || isPending ) {
        return <div id="" className={styles.loading}>
            <Loader />
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
                        {data.image?.url && <Image className={styles.image} url={data.image.url} />}
                        <div className={styles.nav}>
                            <button onClick={handleNavClick} value="prev" type="button">&#8592;</button>
                            <button onClick={handleNavClick} value="next" type="button">&#8594;</button>
                        </div>
                    </div>
                    <p className={classnames( fonts.systemUi, styles.origin )}>UNITED STATES</p>
                    <h2 className={classnames( fonts.humanist, styles.name )}>
                        <span>{data.breed.name}</span>
                        {data.breed.alt_names && <span>(also called {data.breed.alt_names})</span>}
                    </h2>
                    <p className={styles.description}>{data.breed.description}</p>
                    <p className={styles.temperament}>
                        <span>Temperament</span>
                        <span>{data.breed.temperament}</span>
                    </p>
                    {data.image?.id && <Rate imageId={data.image.id}/>}
                </section>
            )}
        </>
    );
};

export default CatCard;