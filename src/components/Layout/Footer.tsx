import { Box, Typography } from "@mui/material"
import moment from "moment"

function Footer() {
    return (
        <Box marginY={10} sx={{textAlign:"center"}} display="flex">
            <Typography sx={{opacity: 0.5, margin: "0 auto" }} fontSize="13px" variant="h6" component="h6">
                &copy; {moment().format("YYYY")} . &#128157; . Dev. by Babatunde Opesemowo
            </Typography>
        </Box>
    )
}

export default Footer