import Image from 'next/image'
import styled from 'styled-components'
import Hero from '../components/Hero'

const SectionStyle = styled.div`
  section{
    height: 100vh;
    width: 100%;
  }
`

export default function Home() {
  return (
    <div>
      <SectionStyle>
        < Hero/>
        
        <section id='section2'></section>
      </SectionStyle>
    </div>
  )
}
