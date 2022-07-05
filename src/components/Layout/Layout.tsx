import { ReactNode, useEffect, useState } from "react";
import { AppWrapper, useAppContext } from "../../context/AppContext";
import LoaderView from "../Loader/LoaderView";
import AppLayout from "./AppLayout";



const Layout = ({ children }: { children: ReactNode }) => {

    return (
        <AppWrapper>
            <LoaderView />
            <AppLayout>
                {children}
            </AppLayout>
        </AppWrapper>
    )
}

export default Layout