import { Box, Container } from "@mui/material"
import NavBar from "../NavBar/NavBar"
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode } from "react";



const Layout = ({ children }: {children: ReactNode}) => {
    
    // const [xsmall, small, small2, medium, large] = useMediaQuery([
    //     "(max-width: 599px)",
    //     "(min-width: 600px) and (max-width: 904px)",
    //     "(min-width: 905px) and (max-width: 1239px)",
    //     "(min-width: 1240px) and (max-width: 1439px)",
    //     "(min-width: 1440px)"
    // ]);

    const matches = useMediaQuery('(min-width:600px)');

    
    const size = matches ? "60%" : "100%";

    return (
        <Box>
            <NavBar />
            <Box>
                <Container  sx={{ width: size, backgroundColor: "white" }}>
                    {children}
                </Container>
            </Box>
        </Box>
    )
}

export default Layout