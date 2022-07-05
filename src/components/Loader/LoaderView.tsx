import { Loop } from '@mui/icons-material';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Box  from '@mui/system/Box';
import { useAppContext } from '../../context/AppContext';


function LoaderView() {
    const { loader } = useAppContext()

    return (
        <Box display={loader ? "inherit" : "none"} sx={{left: "50%", position: "fixed", top: "50%"}}>
            <RotateRightIcon fontSize='large' sx={{
                "z-index": 9999,
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                    "0%": {
                        transform: "rotate(360deg)",
                    },
                    "100%": {
                        transform: "rotate(0deg)",
                    },
                },
            }} />
        </Box>
    )
}

export default LoaderView