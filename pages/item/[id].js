import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ViewItem from '../../src/ViewItem/ViewItem'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';

const viewItem = ({item}) => {
    const router = useRouter()
    const { id } = router.query

    return (
        item.title ? 
        <ViewItem item = {item} /> : 
        <Box sx={{paddingY:10, textAlign: "center", opacity: 0.6}}>
            <SentimentVeryDissatisfiedIcon />
            <Typography marginBottom={2}>
                Item id is not found! 
            </Typography>
            <Link href="/">
                <Button>BACK</Button>
            </Link>
        </Box>
    )

}

export default viewItem

export const getServerSideProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/item/${context.params.id}`)
  const item = await res.json()

  return {
    props: {
      item
    }
  }
}