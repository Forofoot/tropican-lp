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
        <Review cards={cards} />
      </div>
      
    </>
  )
}

export async function getStaticProps() {
  let cards = [
    {
        name: 'Jérémy Ferrier',
        testimony: 'J’ai pu profiter d’un court et magnifique séjour avec mes petits-enfants. C’était super sympa les petits ont hâte qu’on reparte ensemble. On a adoré!',
    },
    {
        name: 'Marine Tourret',
        testimony: 'Nous avons passer un séjour exceptionnel grâce à Leste. Mes loulous et moi avons trouvé des centres d’intérets communs, ce que nous avions pas forcément auparavant.',
    }
  ]
  
  let infos =[ 
    {
        title : 'Qui sommes-nous ?',
        description : "Leste est le meilleur dispositif qui a pour but de créer des voyages et des activités entre grands-parents et petits-enfants pour renfoncer leurs formidable liens."
    }
    
]
  return { props: {infos, cards} }
}