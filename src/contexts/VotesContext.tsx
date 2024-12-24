import {
    createContext,
    PropsWithChildren,
    useCallback,
    useMemo,
} from 'react';
import { fetchVotes, type IVote, QUERY_KEY } from "../apis/the-cat.ts";
import { useQuery } from "@tanstack/react-query";
import { getAverage } from "../utils.ts";


interface IVotesContext {
    allVotes?: IVote[];
    getAverageVoteForImage: ( imageId: string ) => {rate: number, total: number};
    // getSumVotes: ( imageId: string ) => number;
    isLoading?: boolean;
}
// eslint-disable-next-line react-refresh/only-export-components
export const VotesContext = createContext<IVotesContext>( { getAverageVoteForImage: () => ( { rate: 0, total: 0 } ) } );
export const VotesProvider = ( { children }: PropsWithChildren ) => {

    const { data: allVotes, isLoading, isFetching } = useQuery<IVote[], Error>( {
        queryKey: [ QUERY_KEY.VOTES ],
        queryFn: fetchVotes,
        refetchInterval: 5000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        // refetchIntervalInBackground: true
    } );

    const getAverageVoteForImage = useCallback( ( imageId: string ): {rate: number, total: number} => {
        const votes = ( allVotes || [] )
            .filter( vote => vote.image_id === imageId )
            .map( vote => vote.value );
        const total = votes.length;
        return {
            rate: votes.length === 0 ? 0 : Math.round( getAverage( votes ) * 10 ) / 10,
            total
        } ;
    }, [ allVotes ] );

    const value = useMemo( () => {
        return {
            allVotes,
            getAverageVoteForImage,
            isLoading: isLoading || isFetching,
        };
    }, [ allVotes, getAverageVoteForImage, isLoading, isFetching ] );

    return <VotesContext.Provider value={value}>
        {children}
    </VotesContext.Provider>;
};
