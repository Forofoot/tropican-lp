import Image from 'next/image'
import styled from 'styled-components'
import Infos from '/components/Infos'

const SectionStyle = styled.div`
  section{
    height: 100vh;
    width: 100%;
  }
`

export default function Home() {
  return (
    <div>
      <Infos/>
      <section id='section2'></section>
    </div>
  )
}
