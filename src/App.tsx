import { MouseEvent, useState } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import { fetchBreeds, type TCatBreedItem } from "./apis/the-cat";
import CatCard from "./components/CatCard";
import BreedsList from "./components/BreedsList.tsx";
import Modal from "./components/Modal.tsx";

import "@reach/dialog/styles.css";
import "./styles/reset.css";
import "./styles/styles.css";
import styles from "./styles/App.module.css";

const App = () => {
    const [ showDialog, setShowDialog ] = useState<boolean>( false );

    const { isPending, error, data, isFetching } = useQuery<TCatBreedItem[], Error>( {
        queryKey: [ 'breeds' ],
        queryFn: fetchBreeds,
        select: ( data: TCatBreedItem[] ) => data.map( ( { id, name } ) => ( { id, name } ) ) } );

    const [ currentCatId, setCurrentCatId ] = useState<string | null>( null );

    const handleClick = ( id:string ) => ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        setShowDialog( true );
        setCurrentCatId( id );
    };

    const handleClose  = () => setShowDialog( false );

    if( isFetching || isPending ) {
        return <>LOADING ...</>;
    }
    if( error ) {
        return <>ERROR</>;
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Hello cats!</h1>
            { data && data.length > 0 && <BreedsList list={data} onItemClick={handleClick} /> }
            {currentCatId && (
                <Modal showDialog={ showDialog } onDismiss={ handleClose } >
                    <CatCard id={currentCatId} onClose={handleClose} />
                </Modal>
            )}
        </main>
    );
};

export default App;
