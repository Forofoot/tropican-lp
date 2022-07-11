import styled from 'styled-components'
import 'moment/locale/fr'
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';

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
  