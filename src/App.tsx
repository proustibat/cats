import { ChangeEvent, MouseEvent, useState } from "react";
import {
    useQuery,
} from '@tanstack/react-query';
import classnames from "classnames";
import { useDebounce } from "@uidotdev/usehooks";
import { API_TYPE, fetchBreeds, QUERY_KEY, search, type TCatBreedItem } from "./apis/the-cat";
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


const filterBreedItems = ( data: TCatBreedItem[] ) => data.map( ( { id, name, reference_image_id } ) => ( { id, name, reference_image_id } ) );

const App = () => {
    const [ showDialog, setShowDialog ] = useState<boolean>( false );
    const [ searchTerm, setSearchTerm ] = useState<string>( "" );
    const debouncedSearch = useDebounce( searchTerm, 500 );

    // fetch
    const { isPending, error, data, isFetching } = useQuery<TCatBreedItem[], Error>( {
        queryKey: [ QUERY_KEY.BREEDS ],
        queryFn: fetchBreeds,
        select: filterBreedItems
    } );

    // search
    const { error: errorSearch, data: dataSearch, isFetching: isFetchingSearch } = useQuery<TCatBreedItem[], Error>( {
        queryKey: [ QUERY_KEY.SEARCH, debouncedSearch ],
        queryFn: search( debouncedSearch ),
        select: filterBreedItems,
        enabled: !!debouncedSearch,
        placeholderData: ( prev ) => prev && prev?.length > 0 ? prev : data
    } );

    const [ currentCatId, setCurrentCatId ] = useState<string | null>( null );

    const handleClick = ( id:string ) => ( e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        setShowDialog( true );
        setCurrentCatId( id );
    };

    const handleNav = ( direction: "prev"| "next" ) => {
        console.log( direction, currentCatId );

        const currentList = searchTerm ? dataSearch : data;
        const currentIndex = currentList?.findIndex( breed => breed.id === currentCatId );

        if( !currentList || !currentIndex || currentIndex === 0 || currentIndex === currentList.length - 1 ) {
            return;
        }

        setCurrentCatId( direction === "prev"
            ? currentList[currentIndex-1].id
            : currentList[currentIndex+1].id );
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
            <h1 className={styles.title}>Hello {API_TYPE === "dogs" ? "dogs": "cats"}!</h1>

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
                    <CatCard id={currentCatId} onClose={handleClose} onNav={handleNav} />
                </Modal>
            )}
        </main>
    );
};

export default App;
