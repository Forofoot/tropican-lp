import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { BsFillCalendar2DateFill } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/fr'

const ExperienceCardStyle = styled.div`
`

export default function ExperienceCard() {
    let socials = [
        {
            title: 'Facebook',
            icon: <BsFacebook/>,
            link: 'https://www.facebook.com/Leste-109388878480844'
        },
        {
            title: 'Instagram',
            icon: <AiFillInstagram/>,
            link: 'https://www.instagram.com/leste.officiel/'
        }
    ]
    return (
      <ExperienceCardStyle>
      </ExperienceCardStyle>
    )
  }
  