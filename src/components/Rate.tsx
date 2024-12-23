import { ReactElement, MouseEvent } from "react";
import useRate from "../hooks/useRate.tsx";
import styles from "../styles/Rate.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACTION_VOTE, postVote, QUERY_KEY } from "../apis/the-cat.ts";

interface RateProps {
   imageId: string;
}

const Rate = ( { imageId }: RateProps ): ReactElement => {
    const queryClient = useQueryClient();
    const rate = useRate( imageId );

    const { isPending, isError, error, isSuccess, mutate } = useMutation( {
        mutationFn: postVote,
        onSuccess: () => queryClient.invalidateQueries( { queryKey: [ QUERY_KEY.VOTES ] } )
    } );

    const handleVote = ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        mutate( { imageId, action: e.currentTarget.value as ACTION_VOTE } );
    };

    return (
        <>
            <div className={styles.container}>
                <button onClick={handleVote} value={ACTION_VOTE.DOWN} type="button" className={styles.button}>-</button>
                <p className={styles.rate}>Rate: {rate}/10</p>
                <button onClick={handleVote} value={ACTION_VOTE.UP} type="button" className={styles.button}>+</button>
            </div>
            <div className={styles.container}>
                {isPending && <p>sending...</p>}
                {isError && <p>An error occurred: {error.message}</p>}
                {isSuccess && <p>Rated!</p>}
            </div>
        </>

    );
};

export default Rate;