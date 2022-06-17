import Image from 'next/image'
import styled from 'styled-components'

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
      <section id='section1'></section>
      <section id='section2'></section>
        </SectionStyle>
    </div>
  )
}
