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

export default function SearchBar({handleSearch}:{handleSearch:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void}) {
    return (
        <Box sx={{ paddingY: 10 }} >
            <OutlinedInput fullWidth
                id="outlined-adornment-weight"
                onChange={handleSearch}
                placeholder="Search from your list with ease &#x1F603;"
                endAdornment={<InputAdornment position="end"><Search /></InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
            />
        </Box>
    );
}

