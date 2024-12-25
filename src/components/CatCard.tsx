import { ReactElement, MouseEvent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import classnames from "classnames";
import { fetchBreed, type ICatBreed, type TImageItem, QUERY_KEY, IFact } from "../apis/the-cat";
import Image from "./Image";
import CloseButton from "./CloseButton.tsx";
import Loader from "./Loader";
import fonts from "../styles/modern-fonts.module.css";
import styles from "../styles/CatCard.module.css";
import Rate from "./Rate.tsx";
import ReactGA from "react-ga4";

interface CatCardProps {
   id: string;
   onClose: () => void;
   onNav: ( direction: "prev" | "next" ) => void;
}

const CatCard = ( { id, onClose, onNav }: CatCardProps ): ReactElement => {
    const { isPending, error, data, isFetching } = useQuery<{breed: ICatBreed, image?: TImageItem, fact?: IFact}, Error>( {
        queryKey: [ QUERY_KEY.BREED, id ],
        queryFn: fetchBreed( id ),
        placeholderData: prev => prev,
        enabled: !!id
    } );
    
    const handleNavClick = ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        onNav( e.currentTarget.value as "prev" | "next" );
    };

    useEffect( () => {
        ReactGA.send( { hitType: "pageview", page: "CatCard", id } );
    }, [ id ] );

    return (
        <section className={styles.container}>
            <div className={styles.navContainerWithImage}>
                <CloseButton onClose={onClose}/>
                {( isPending || isFetching ) && <div id="" className={styles.loading}><Loader/></div>}
                {error && <div id="" className={styles.loading}>ERROR: {error.message}</div>}
                {data?.image?.url && <Image className={styles.image} url={data.image.url} />}
                <div className={styles.nav}>
                    <button disabled={isFetching || isPending} onClick={handleNavClick} value="prev" type="button">&#8592;</button>
                    <button disabled={isFetching || isPending} onClick={handleNavClick} value="next" type="button">&#8594;</button>
                </div>
            </div>
            <div className={classnames( styles.information, { [styles.opacity]: ( isFetching || isPending ) } )}>
                {/* ORIGIN */}
                {data?.breed.origin && <p className={classnames( fonts.systemUi, styles.origin )}>{data.breed.origin}</p>}

                {/* NAME */}
                {
                    data?.breed.name && (
                        <h2 className={classnames( fonts.humanist, styles.name )}>
                            <span>{data.breed.name}</span>
                            {data?.breed.alt_names && <span>(also called {data.breed.alt_names})</span>}
                        </h2>
                    )
                }

                {/* RATING */}
                {data?.image?.id && <Rate disabled={isFetching || isPending} imageId={data?.image.id}/>}

                {/* DESCRIPTION */}
                {data?.breed.description && <p className={styles.description}>{data?.breed.description}</p>}

                {/* TEMPERAMENT */}
                {data?.breed.temperament && (
                    <p className={styles.property}>
                        <span>Temperament</span>
                        <span>{data.breed.temperament}</span>
                    </p>
                )}

                {/* FACT */}
                {data?.fact && (
                    <p className={styles.property}>
                        <span>Random fact</span>
                        <span>{data.fact.fact}</span>
                    </p>
                )}
            </div>

        </section>
    );
};

export default CatCard;