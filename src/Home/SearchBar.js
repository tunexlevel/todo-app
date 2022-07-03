import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Search from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

export default function SearchBar({handleSearch}) {
    return (
        // <Box sx={{ paddingY: 10 }} >
        //     <TextField 
        //     fullWidth 
        //     id="outlined-basic"  
        //     label="Search from your list" 
        //     variant="outlined"
        //     endAdornment={<InputAdornment position="end">IK</InputAdornment>}
        //     />
        // </Box>
        <Box sx={{ paddingY: 10 }} >
            <OutlinedInput fullWidth
                id="outlined-adornment-weight"
                onChange={handleSearch}
                placeholder="Search from your list with ease..."
                endAdornment={<InputAdornment position="end"><Search /></InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
            />
        </Box>
    );
}

