import { Box, Container } from "@mui/material"
import NavBar from "../NavBar/NavBar"
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode } from "react";
import { AppWrapper } from "../../context/AppContext";



const Layout = ({ children }: { children: ReactNode }) => {

    const matches = useMediaQuery('(min-width:600px)');

    const size = matches ? "60%" : "100%";

    return (
        <Box>
            <NavBar />
            <Box>
                <AppWrapper>
                    <Container sx={{ width: size, backgroundColor: "white" }}>
                        {children}
                    </Container>
                </AppWrapper>
            </Box>
        </Box>
    )
}

export default Layout