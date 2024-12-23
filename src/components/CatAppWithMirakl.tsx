import { useEffect, useState } from "react";
import {
    CATS_NAMES,
    fetchById,
    type Cat,
    type Celebrity,
} from "../apis/mirakl";

/**
 * The goal is to display the information about the selected cat:
 * - the name
 * - the description
 * - celebrities
 *   - the oldest cat name
 *   - the average age of cats
 *
 * An API `fetchCatDescriptionById` is given to you to fetch information
 * of a specific cat by its id.
 *
 * Steps:
 * - the first step will be to make the selected cat dynamic (currently static, passing the catId === 1 always)
 * - then to implement the logic in the `CatDescription` to fetch the description and display it
 * - celebrities
 *    - display the oldest cat name
 *    - display the average age of cats
 */

const CatAppWithMirakl = () => {
    const [ currentCatId, setCurrentCatId ] = useState<number | null>( null );

    const handleClick = ( catId: number ) => () => {
        setCurrentCatId( catId );
    };

    return (
        <div className="page">
            <div className="header">
                {CATS_NAMES.map( ( cat ) => (
                    <button key={cat.id} type="button" onClick={handleClick( cat.id )}>
                        {cat.name}
                    </button>
                ) )}
            </div>
            {currentCatId && <CatDescription catId={currentCatId} />}
        </div>
    );
};

const CatDescription = ( { catId }: { catId: number } ) => {
    const [ catInfo, setCatInfo ] = useState<Cat | null>( null );
    const [ isLoading, setIsLoading ] = useState<boolean>( false );

    useEffect( () => {
        if ( catId ) {
            console.log( "useEffect" );
            getData( catId );
        }
    }, [ catId ] );

    const getData = async ( id: number ) => {
        setIsLoading( true );
        const data = await fetchById( id ).catch( () => console.log );
        if ( data ) {
            setCatInfo( data as Cat );
        }
        else {
            setCatInfo( null );
        }
        setIsLoading( false );
    };

    const getOldest = ( celebrities: Celebrity[] ) => {
        const oldest = celebrities.reduce( ( acc, current ) => {
            return acc.age > current.age ? acc : current;
        } );
        return oldest.name;
    };

    if ( isLoading ) {
        console.log( "LOADING" );
        return <p>Loading...</p>;
    }

    return (
        <div>
            {catInfo ? (
                <>
                    <p>{catInfo.name}</p>
                    <p>{catInfo.description}</p>
                    <p>Oldest celebrity: {getOldest( catInfo.celebrities )}</p>
                </>
            ) : (
                <p>No information</p>
            )}
        </div>
    );
};

export default CatAppWithMirakl;
