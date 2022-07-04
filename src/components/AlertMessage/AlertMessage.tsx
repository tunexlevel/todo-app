import { useState } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useAppContext } from '../../context/AppContext';


const AlertMessage = () => {

    const { messageAlert, setMessageAlert, open, setOpen } = useAppContext();
    

    return (

        <>
            {messageAlert.status && <Collapse in={open}>
                <Alert action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                            setMessageAlert({ status: false, message: "" })
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                    sx={{ mb: 2 }} severity="info">{messageAlert.message}</Alert>
            </Collapse>}
        </>
    )
}

export default AlertMessage