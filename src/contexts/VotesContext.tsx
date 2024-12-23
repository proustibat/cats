import {
    createContext,
    PropsWithChildren,
} from 'react';
import { fetchVotes, type IVote, QUERY_KEY } from "../apis/the-cat.ts";
import { useQuery } from "@tanstack/react-query";
import { getAverage } from "../utils.ts";


interface IVotesContext {
    allVotes?: IVote[];
    getAverageVoteForImage: ( imageId: string ) => number;
    isLoading?: boolean;
}
// eslint-disable-next-line react-refresh/only-export-components
export const VotesContext = createContext<IVotesContext>( { getAverageVoteForImage: () => 0 } );
export const VotesProvider = ( { children }: PropsWithChildren ) => {

    const { data: allVotes, isLoading, isFetching } = useQuery<IVote[], Error>( {
        queryKey: [ QUERY_KEY.VOTES ],
        queryFn: fetchVotes
    } );

    const getAverageForImage = ( imageId: string ): number => {
        const votes = ( allVotes || [] )
            .filter( vote => vote.image_id === imageId )
            .map( vote => vote.value );
        return votes.length === 0 ? 0 : Math.round( getAverage( votes ) * 10 ) / 10 ;
    };

    return <VotesContext.Provider value={{
        allVotes,
        getAverageVoteForImage: getAverageForImage,
        isLoading: isLoading || isFetching,
    }}>
        {children}
    </VotesContext.Provider>;
};
