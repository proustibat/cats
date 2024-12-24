import { ReactElement, MouseEvent, useEffect } from "react";
import useRate from "../hooks/useRate.tsx";
import styles from "../styles/Rate.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ACTION_VOTE, postVote, QUERY_KEY } from "../apis/the-cat.ts";
import classnames from "classnames";

interface RateProps {
   imageId: string;
   disabled?: boolean
}

const Rate = ( { imageId, disabled = false }: RateProps ): ReactElement => {
    const queryClient = useQueryClient();
    const rate = useRate( imageId );

    const { isPending, isError, error, isSuccess, mutate, reset } = useMutation( {
        mutationKey: [ QUERY_KEY.RATE ],
        mutationFn: postVote,
        onSuccess: () => queryClient.invalidateQueries( { queryKey: [ QUERY_KEY.VOTES ] } ),
    } );

    useEffect( () => {
        reset();
    }, [ imageId, reset ] );

    const handleVote = ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        mutate( { imageId, action: e.currentTarget.value as ACTION_VOTE } );
    };

    return (
        <>
            <div className={styles.container}>
                <button disabled={disabled || isPending} onClick={handleVote} value={ACTION_VOTE.DOWN} type="button" className={styles.button}>-</button>
                <p className={styles.rate}>Votes: {rate}</p>
                <button disabled={disabled || isPending} onClick={handleVote} value={ACTION_VOTE.UP} type="button" className={styles.button}>+</button>
            </div>
            <div className={classnames( styles.container, styles.message )}>
                {isPending && <p>sending...</p>}
                {isError && <p>An error occurred: {error.message}</p>}
                {isSuccess && <p>Rated!</p>}
            </div>
        </>

    );
};

export default Rate;