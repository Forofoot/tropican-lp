import Review from '../components/review'
import styled from 'styled-components'
import Infos from '/components/Infos'
import Hero from '../components/Hero'

const SectionStyle = styled.div`

  .sectionTitle{
    text-align: center;
    font-weight:400;
    margin-bottom:100px;

      span{
        font-weight:bold;
      }
  }

  .containerReview{
    padding:0 100px;
    display: flex;
    justify-content:space-around;
    margin-bottom:90px;
    flex-wrap: wrap;
  }
`

export default function Home() {
  return (
<SectionStyle>
<div>
      < Hero/>
      <Infos/>
      <h2 className='sectionTitle'>Vos <span>avis</span> et <span>ressenties</span> comptes</h2>
        <div className='containerReview'>
        <Review srcPhoto="/logo.svg" nom="Jérémy Ferrier" statut="Grand-Père" testimony="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore" />
        <Review srcPhoto="/logo.svg" nom="Marine Tourret" statut="Grand-Mère" testimony="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <Review srcPhoto="/logo.svg" nom="Jimmy Renden" statut="Grand-Père" testimony="Lorem ipsum dolor sit amet" />
        </div>
    </div>
</SectionStyle>
  )
}
