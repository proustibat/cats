import { ChangeEvent, MouseEvent, useState } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import classnames from "classnames";
import { useDebounce } from "@uidotdev/usehooks";
import { fetchBreeds, search, type TCatBreedItem } from "./apis/the-cat";
import CatCard from "./components/CatCard";
import BreedsList from "./components/BreedsList.tsx";
import Modal from "./components/Modal.tsx";
import SearchBox from "./components/SearchBox.tsx";
import loader from "./assets/loader.gif";

import "@reach/dialog/styles.css";
import "./styles/reset.css";
import "./styles/styles.css";
import styles from "./styles/App.module.css";
import fonts from "./styles/modern-fonts.module.css";

const App = () => {
    const [ showDialog, setShowDialog ] = useState<boolean>( false );
    const [ searchTerm, setSearchTerm ] = useState<string>( "" );
    const debouncedSearch = useDebounce( searchTerm, 500 );

    const { isPending, error, data, isFetching } = useQuery<TCatBreedItem[], Error>( {
        queryKey: [ 'breeds' ],
        queryFn: fetchBreeds,
        select: ( data: TCatBreedItem[] ) => data.map( ( { id, name } ) => ( { id, name } ) ) } );

    const { error: errorSearch, data: dataSearch, isFetching: isFetchingSearch } = useQuery<TCatBreedItem[], Error>( {
        queryKey: [ 'search', debouncedSearch ],
        queryFn: search( debouncedSearch ),
        select: ( data: TCatBreedItem[] ) => data.map( ( { id, name } ) => ( { id, name } ) ),
        enabled: !!debouncedSearch,
        placeholderData: ( prev ) => prev && prev?.length > 0 ? prev : data
    } );


    const [ currentCatId, setCurrentCatId ] = useState<string | null>( null );

    const handleClick = ( id:string ) => ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        setShowDialog( true );
        setCurrentCatId( id );
    };

    const handleClose  = () => setShowDialog( false );

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        e.preventDefault();
        setSearchTerm( e.target.value );
    };

    if( isFetching || isPending ) {
        return <p className={styles.loading}><span>Loading...</span><img src={loader} alt="loading..."/></p>;
    }
    if( error ) {
        return <>ERROR</>;
    }

    return (
        <main className={classnames( fonts.industrial, styles.main )}>
            <h1 className={styles.title}>Hello cats!</h1>

            <SearchBox searchTerm={searchTerm} onChange={handleChange} />
            <div className={styles.searchResultMessage}>
                {( isFetchingSearch ) && <p>Loading...</p>}
                {errorSearch && <p>Error</p>}
            </div>

            <BreedsList
                list={ searchTerm ? dataSearch : data}
                onItemClick={handleClick}
            />

            {currentCatId && (
                <Modal showDialog={ showDialog } onDismiss={ handleClose } >
                    <CatCard id={currentCatId} onClose={handleClose} />
                </Modal>
            )}
        </main>
    );
};

export default App;
