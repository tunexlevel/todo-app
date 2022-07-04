import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Grid, Typography } from "@mui/material"
import Link from "next/link"
import { useAppContext } from "../../context/AppContext";

const BreadCrumb = ({page} : {page: string}) => {

    const {messageAlert, setMessageAlert} = useAppContext();

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
                        <Button onClick ={()=>setMessageAlert({ status: false, message: "" })}><ArrowBack /></Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BreadCrumb