import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';


const LOCALSTORAGE_KEY = "user";

interface IUserContext {
    userId: string | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = React.createContext<IUserContext>( { userId: null } );
export const UserProvider = ( { children }: PropsWithChildren ) => {

    const [ userId, setUserId ] = useState<string>( crypto.randomUUID() );

    useEffect( () => {
        const lsUser = localStorage.getItem( LOCALSTORAGE_KEY );
        if( lsUser ) {
            const { userId }= JSON.parse( lsUser );
            setUserId( userId );
        }
        else {
            localStorage.setItem( LOCALSTORAGE_KEY, JSON.stringify( { userId: userId } ) );
        }
    }, [] );

    const value = useMemo( () => {
        return { userId };
    }, [ userId ] );


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
