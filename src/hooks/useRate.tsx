import { useContext, useEffect, useState } from "react";
import { VotesContext } from "../contexts/VotesContext.tsx";

const useRate = ( imageId?: string ) => {
    const { allVotes, isLoading, getAverageVoteForImage, getSumVotes } = useContext( VotesContext );

    const [ rate, setRate ] = useState<number>();

    useEffect( () => {
        if( !isLoading && imageId ) {
            setRate( getSumVotes( imageId ) );
            // setRate( getAverageVoteForImage( imageId ) ); // TODO: will be used when voting between 1 and 10
        }
    }, [ isLoading, allVotes, getAverageVoteForImage, imageId ] );

    return rate;
};

export default useRate;