import {
    createContext,
    PropsWithChildren,
} from 'react';
import { fetchVotes, type IVote, QUERY_KEY } from "../apis/the-cat.ts";
import { useQuery } from "@tanstack/react-query";
import { getAverage, getSum } from "../utils.ts";


interface IVotesContext {
    allVotes?: IVote[];
    getAverageVoteForImage: ( imageId: string ) => number;
    getSumVotes: ( imageId: string ) => number;
    isLoading?: boolean;
}
// eslint-disable-next-line react-refresh/only-export-components
export const VotesContext = createContext<IVotesContext>( { getAverageVoteForImage: () => 0, getSumVotes: () => 0 } );
export const VotesProvider = ( { children }: PropsWithChildren ) => {

    const { data: allVotes, isLoading, isFetching } = useQuery<IVote[], Error>( {
        queryKey: [ QUERY_KEY.VOTES ],
        queryFn: fetchVotes,
        refetchInterval: 1000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        // refetchIntervalInBackground: true
    } );

    const getAverageForImage = ( imageId: string ): number => {
        const votes = ( allVotes || [] )
            .filter( vote => vote.image_id === imageId )
            .map( vote => vote.value );
        return votes.length === 0 ? 0 : Math.round( getAverage( votes ) * 10 ) / 10 ;
    };

    const getSumVotes = ( imageId: string ): number => {
        const votes = ( allVotes || [] )
            .filter( vote => vote.image_id === imageId )
            .map( vote => vote.value );
        return votes.length === 0 ? 0 : getSum( votes );
    };

    return <VotesContext.Provider value={{
        allVotes,
        getAverageVoteForImage: getAverageForImage,
        getSumVotes,
        isLoading: isLoading || isFetching,
    }}>
        {children}
    </VotesContext.Provider>;
};
