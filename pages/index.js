import Infos from '/components/Infos'
import Hero from '../components/Hero'
import Review from '../components/Review'
import Head from 'next/head'
import { useEffect } from 'react'
import {getLCP, getFID, getCLS} from 'web-vitals';

export default function Home() {
  useEffect(() => {
    getCLS(console.log);
    //getFID(console.log);
    //getLCP(console.log);
  }, []);
  
  return (
    <>
      <Head>
        <title>Tropican App</title>
      </Head> 
      <Hero/>
      <Infos/>
      <Review/>
    </>
  )
}
