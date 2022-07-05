import { ReactNode } from "react";
import { AppWrapper } from "../../context/AppContext";
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