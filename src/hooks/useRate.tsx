import { useContext, useEffect, useState } from "react";
import { VotesContext } from "../contexts/VotesContext.tsx";

const useRate = ( imageId?: string ) => {
    const { allVotes, isLoading, getAverageVoteForImage } = useContext( VotesContext );

    const [ rate, setRate ] = useState<number>();

    useEffect( () => {
        if( !isLoading && imageId ) {
            setRate( getAverageVoteForImage( imageId ) );
        }
    }, [ isLoading, allVotes, getAverageVoteForImage, imageId ] );

    return rate;
};

export default useRate;