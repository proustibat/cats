import { MouseEvent, useState } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import { fetchBreeds, type TCatBreedItem } from "./apis/the-cat";
import CatCard from "./components/CatCard";

import "./styles/reset.css";
import "./styles/styles.css";
import styles from "./styles/App.module.css";


export default function App() {
    const { isPending, error, data, isFetching } = useQuery<TCatBreedItem[], Error>( {
        queryKey: [ 'breeds' ],
        queryFn: fetchBreeds,
        select: ( data: TCatBreedItem[] ) => data.map( ( { id, name } ) => ( {
            id,
            name,
        } ) )
    } );

    const [ currentCatId, setCurrentCatId ] = useState<string | null>( null );

    const handleClick = ( id:string ) => ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        setCurrentCatId( id );
    };

    if( isFetching || isPending ) {
        return <>"LOADING ..."</>;
    }
    if( error ) {
        return <>"ERROR"</>;
    }

    return (
        <main className={styles.main}>
            <h1>Hello cats!</h1>
            {
                data && data.length > 0 && (
                    <ul className="breeds-list">
                        {data.map( ( { name, id } ) => (
                            <li key={id}>
                                <button type="button" onClick={handleClick( id )}>{name}</button>
                            </li>
                        ) )}
                    </ul>
                )
            }
            {currentCatId && (
                <CatCard id={currentCatId}/>
            )}
        </main>
    );
}
