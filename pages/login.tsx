import Box from '@mui/material/Box';
import LoginView from '../src/components/Login/LoginView';
import moment from "moment";


export default function Login({token}: { token: number }) {

  return (
    <Box>
        <LoginView token={token}/>
    </Box>
  )
}

//fetch csrf token
export const getServerSideProps = async () => {
    //const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get/tokem`)
    //const Items = await res.json()
    return {
        props: {
            token: moment().format('x')
        }
    }
}
