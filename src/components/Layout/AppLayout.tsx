import { Box, Container } from "@mui/material"
import NavBar from "../NavBar/NavBar"
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode, useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const AppLayout = ({children}: { children: ReactNode }) => {

    const { loader } = useAppContext()

    const matches = useMediaQuery('(min-width:600px)');
    const [screenWith, setScreenWith] = useState("60%")

    useEffect(() => {
        let newSize = matches ? "60%" : "100%";
        setScreenWith(newSize)

    }, [matches])

    return (
        <Box display={loader ? "none" : "inherit"}>
            <NavBar />
            <Container sx={{ width: screenWith, backgroundColor: "white" }}>
                {children}
            </Container>
        </Box>
    )
}

export default AppLayout