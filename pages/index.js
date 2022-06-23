import Infos from '/components/Infos'
import Hero from '../components/Hero'
import Video from '../components/Video'
import Review from '../components/Review'
import Head from 'next/head'

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Tropican App</title>
      </Head> 
      <div className='container'>
        <Hero/>
        <Infos/>
        <Video />
        <Review/>
      </div>
      
    </>
  )
}
