import Image from 'next/image'
import styled from 'styled-components'
import Infos from '/components/Infos'
import Hero from '../components/Hero'

const SectionStyle = styled.div`
`

export default function Home() {
  return (
    <div>
      < Hero/>
      <Infos/>
    </div>
  )
}
