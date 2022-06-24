import Infos from '/components/Infos'
import Hero from '../components/Hero'
import Video from '../components/Video'
import Review from '../components/Review'
import Head from 'next/head'

export default function Home({infos,cards}) {
  return (
    <>
      <Head>
        <title>Tropican App</title>
      </Head> 
      <div className='container'>
        <Hero/>
        <Infos infos={infos}/>
        <Video />
        <Review cards={cards}/>
      </div>
      
    </>
  )
}

export async function getStaticProps() {
  // Fetch data from external API
  try{
  
  const res = await fetch(`${process.env.API_URL}api/infos`)
  const infos = await res.json()

  const resCards = await fetch(`${process.env.API_URL}api/cards`)
  const cards = await resCards.json()

  // Pass data to the page via props
  return { props: {infos, cards} }

  } catch(err) {
      console.log("err: ", err)
  }
}