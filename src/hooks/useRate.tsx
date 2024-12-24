import { useContext, useEffect, useState } from "react";
import { VotesContext } from "../contexts/VotesContext.tsx";

const useRate = ( imageId?: string ) => {
    const { allVotes, isLoading, getAverageVoteForImage } = useContext( VotesContext );

    const [ rate, setRate ] = useState<number>();
    const [ total, setTotal ] = useState<number>();

    useEffect( () => {
        if( !isLoading && imageId ) {
            const { rate, total } = getAverageVoteForImage( imageId );
            setRate( rate );
            setTotal( total );
        }
    }, [ isLoading, allVotes, getAverageVoteForImage, imageId ] );

    return { rate, total };
};

export default useRate;