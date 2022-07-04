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
    open: boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>
}


let defaultState = {
    messageAlert: { status: false, message: "" },
    setMessageAlert: (): AlertType => ({ status: false, message: "" }),
    open: false, 
    setOpen: (): boolean => false,
}



const AppContext = createContext<AppContextType>(defaultState);

export function AppWrapper({ children }: { children: ReactNode }) {

    const [messageAlert, setMessageAlert] = useState({ status: false, message: "" });
    const [open, setOpen] = useState(true);
    
    const sharedState = {
        messageAlert,
        setMessageAlert,
        open, 
        setOpen
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