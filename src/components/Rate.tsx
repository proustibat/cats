import { ReactElement, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import classnames from "classnames";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import useRate from "../hooks/useRate.tsx";
import { postVote, QUERY_KEY } from "../apis/the-cat.ts";

import styles from "../styles/Rate.module.css";
import { UserContext } from "../contexts/UserContext.tsx";
import ReactGA from "react-ga4";

interface RateProps {
   imageId: string;
   disabled?: boolean
}

const Rate = ( { imageId, disabled = false }: RateProps ): ReactElement => {
    const queryClient = useQueryClient();
    const { rate, total } = useRate( imageId );
    const [ feedback, setFeedback ] = useState<string>( "" );
    const { userId } = useContext( UserContext );

    const { isPending, isError, error, isSuccess, mutate, reset } = useMutation( {
        mutationKey: [ QUERY_KEY.RATE ],
        mutationFn: postVote,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: [ QUERY_KEY.VOTES ] } ).catch( console.error );
        },
    } );

    useEffect( () => {
        reset();
    }, [ imageId, reset ] );

    useEffect( () => {
        if( isSuccess ) {
            setFeedback( "Rated!" );
        }
        const timer = setTimeout( () => { setFeedback( "" ); }, 3000 );
        return () => clearTimeout( timer );
    }, [ isSuccess ] );

    const handleVote = ( value: number | number[] ) => {
        if( typeof value === "number" ) {
            if( userId ) {
                mutate( { imageId, value, userId } );
                ReactGA.event( {
                    category: 'User',
                    action: 'Rated',
                    label: imageId,
                } );
            }
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <p className={styles.rate}>Rate: {rate} / 10<span>{`(${ total } vote${ ( total && total>1 ) ? "s":"" })`}</span></p>
            </div>

            <div className={styles.container}>
                <Slider
                    defaultValue={undefined}
                    marks={{ "0": 0, "2": 2, "4": 4, "6": 6, "8": 8, "10": 10 }}
                    disabled={disabled || isPending || feedback?.length > 0}
                    className={styles.input}
                    min={0}
                    max={10}
                    step={1}
                    dots={true}
                    onChangeComplete={handleVote}
                />
            </div>

            <div className={classnames( styles.container, styles.message )}>
                {isPending && <p>sending...</p>}
                {isError && <p>An error occurred: {error.message}</p>}
                {feedback && <p>{feedback}</p>}
            </div>
        </section>

    );
};

export default Rate;