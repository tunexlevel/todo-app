import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Item } from '../models/interface';
import { DefaultItem } from '../models/defaultData';
import axios from 'axios';

export interface AlertType {
    status: boolean,
    message: string
}

export interface AppContextType {
    messageAlert: AlertType,
    setMessageAlert: Dispatch<SetStateAction<AlertType>>
}


let defaultState = {
    messageAlert: { status: false, message: "" },
    setMessageAlert: (): AlertType => ({ status: false, message: "" }),
}



const AppContext = createContext<AppContextType>(defaultState);

export function AppWrapper({ children }: { children: ReactNode }) {

    const [messageAlert, setMessageAlert] = useState({ status: false, message: "" });

    
    const sharedState = {
        messageAlert,
        setMessageAlert
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}