import styled from 'styled-components'
import Infos from '/components/Infos'
import Hero from '../components/Hero'
import Review from '../components/Review'

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
    <>
      <Hero/>
      <Infos/>
      <Review/>
    </>
  )
}
