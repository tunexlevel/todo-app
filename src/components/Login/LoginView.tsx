import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import AlertMessage from "../AlertMessage/AlertMessage";
import BreadCrumb from "../Layout/BreadCrumb";

interface State {
    password: string;
    email: string;
    showPassword: boolean;
}


const LoginView = ({ token }: { token: number }) => {

    const { setMessageAlert, setOpen } = useAppContext()

    const [values, setValues] = useState<State>({
        password: '',
        email: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleLogin = () => {
        
        if (!values.email || !values.password) {
            setMessageAlert({ status: true, message: "Email and Password are required!" })
            setOpen(true)
            console.log(values)
            return false;
        }

        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (values.email.match(mailformat)) {
            try {
                //send token to the server for validation
                const result =  {status: 200, message: "ok"} //axios.post("/login", { email: values.email, password: values.password, token })
    
                if(result.status === 200){
                    setMessageAlert({ status: true, message: "You are highly welcome!" })
                    setOpen(true)
                }
                else{
                    setMessageAlert({ status: true, message: "Invalid email or password!" })
                    setOpen(true)
                }
                
            }
            catch (e) {
                setMessageAlert({ status: true, message: "Somethin went wrong, please try again!" })
                setOpen(true)
            }
        }
        else{
            setMessageAlert({ status: true, message: "The email is invalid!" })
            setOpen(true)
        }

        
    }



    return (
        <>
            <BreadCrumb page={"LOGIN"} />
            <AlertMessage />
            <Stack spacing={4} paddingY={5}>
                <TextField
                    id="outlined-email"
                    label="Email"
                    value={values.email}
                    onChange = {handleChange('email')}
                />

                <FormControl variant="outlined">
                    <InputLabel sx={{ maxLength: 10 }} htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        sx={{ maxLength: 10 }}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <Button onClick={() => handleLogin()} variant="contained" sx={{ height: 56 }} color="success">Login</Button>
            </Stack>
        </>
    )
}

export default LoginView

