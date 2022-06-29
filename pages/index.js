import Infos from '/components/Infos'
import Hero from '../components/Hero'
import Video from '../components/Video'
import Review from '../components/Review'
import Brands from '../components/Brands'
import Head from 'next/head'

export default function Home({infos,cards,brands}) {

  return (
    <>
      <Head>
        <title>Leste</title>
      </Head> 
      <div className='container'>
        <Hero/>
        <Infos infos={infos}/>
        <Video />
        <Review cards={cards} />
        <Brands brands={brands}/>
      </div>
    </>
  )
}

export async function getStaticProps() {
  let cards = [
    {
        name: 'Jérémy Ferrier',
        testimony: 'Passer du temps avec papy, c’est trop cool ! Il est plus vif que ce que j’imaginais. Hâte de faire de nouvelles activités et de le découvrir un peu plus :)',
        img:'/reviews/review1.webp',
        date: '23/06/22'
    },
    {
        name: 'Marine Tourret',
        testimony: 'Je me suis retrouvée une jeunesse avec mes enfants ! J’ai pu leur faire découvrir ma passion et ils ont chéri nos moment passés ensemble !',
        img:'/reviews/review2.webp',
        date: '21/02/22'
    },
    {
        name: 'Grégory Pinard',
        testimony: 'On a découvert notre destination deux jours avant de partir ! C’était génial on a fait plein de choses. Ça a changé de journées que l’on passe ensemble habituellement.',
        img:'/reviews/review3.webp',
        date: '16/01/22'
    }
  ]
  
  let infos =[ 
    {
        title : 'Qui sommes-nous ?',
        description : "Leste est un dispositif incroyable ! Nous vous organisons différentes expériences de voyages et d’activités entre vous et vos petits-enfants inoubliable."
    }
  ]

  let brands =[
    {
      img:'/brands/easyjet-logo.webp',
      title:'Easyjet',
      width:124,
      height:31
    },
    {
      img:'/brands/decathlon-logo.webp',
      title:'Decathlon',
      width:126,
      height:31
    },
    {
      img:'/brands/flixbus-logo.webp',
      title:'Flixbus',
      width:114,
      height:60
    },
    {
      img:'/brands/centerpark-logo.webp',
      title:'CenterParcs',
      width:96,
      height:96
    },
    {
      img:'/brands/sncf-logo.webp',
      title:'SNCF',
      width:73,
      height:39
    }
  ]

  return { props: {infos, cards, brands}}
}