import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAppContext } from '../../context/AppContext';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#2e7d32",
        },
    },
});


export default function ButtonAppBar() {

    const { loader } = useAppContext()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <PlaylistAddCheckIcon />
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link href='/'>TODO APP</Link>
                        </Typography>

                        <Button color="inherit"><Link href='/newItem'>ADD NEW ITEM</Link></Button>
                        <Button color="inherit"><Link href='/login'>LOGIN</Link></Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}
