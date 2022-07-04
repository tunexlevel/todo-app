import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Grid, Typography } from "@mui/material"
import Link from "next/link"

const BreadCrumb = ({page}) => {
    return (
        <Box sx={{ paddingY: 4 }}>
            <Grid container>
                <Grid item xs={8}>
                    <Typography>
                        {page || "PAGE"}
                    </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                    <Link href="/">
                        <Button><ArrowBack /></Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BreadCrumb