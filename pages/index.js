import Box from '@mui/material/Box';
import HomeView from '../src/components/Home/HomeView';
import Head from 'next/head';
import { useEffect, useState } from 'react';


export default function App({ Items }) {

  return (
    <Box>
      <HomeView Items={Items} />
    </Box>
  )
}


export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/item/all`)
  const Items = await res.json()
  return {
    props: {
      Items
    }
  }
}