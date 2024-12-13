import { ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBreed, ICatBreed } from "../apis/the-cat";
import Image from "./Image";

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
                <section>
                    <h2>{data.name}{data.alt_names && ( <>&nbsp;<span>(also called {data.alt_names})</span></> )}</h2>
                    <p>{data.description}</p>
                    <p>Temperament: {data.temperament}</p>
                    {data.reference_image_id && <Image id={data.reference_image_id} />}
                </section>
            )}
        </>
    );
};

export default CatCard;