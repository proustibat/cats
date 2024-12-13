import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBreed, ICatBreed } from "../apis/the-cat";
import Image from "./Image";
import classnames from "classnames";
import styles from "../styles/CatCard.module.css";
import fonts from "../styles/modern-fonts.module.css";

interface CatCardProps {
   id: string;
}

const CatCard = ( { id }: CatCardProps ): ReactElement => {
    const { isPending, error, data, isFetching } = useQuery<ICatBreed, Error>( {
        queryKey: [ 'breed', id ],
        queryFn: fetchBreed( id ),
    } );

    if( isFetching || isPending ) {
        return <>"LOADING ..."</>;
    }
    if( error ) {
        return <>"ERROR"</>;
    }

    return (
        <>
            {data && (
                <section className={styles.container}>
                    {data.reference_image_id && <Image className={styles.image} id={data.reference_image_id} />}
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