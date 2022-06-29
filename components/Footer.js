import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import NewsletterSubscribe from "./NewsletterSubscribe"
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';


const FooterStyle = styled.footer`
      border-radius: 25px 25px 0 0;
      .footerBottom{
        padding:25px 25px;
        text-align:center;
      }
    .footerTop{
      color:#F4F4F4;
      background-color:#7159AD;
      padding:50px 25px;
      h2,
      label{
        font-size:1em;
        text-transform:uppercase;
        font-weight:bold;
        display:block;
        margin-bottom: 15px;
      }

      h2{
        color: #F4F4F4;
      }
      
      ul{
        display:flex;
        gap: 10px;
        margin-bottom:50px;
        .iconSocial{ 
          a{
            font-size: 30px;
          }
          &:last-child{
            margin-right:0;
          }
          svg{
            width: 40px;
            height: 40px;
            vertical-align: middle;
          }
          &:last-child{
            svg{
              width: 48px;
              height: 48px;
            }
          }
        }
      }
      .buttonWrap{
        text-align: center;
        @media (min-width: 768px) {
          text-align: right;
        }
      }
      .policy{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        a{
          color: #fff;
          &:first-child{
            margin-bottom: 10px;
          }
        }
      }
    }
`

export default function Footer() {
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
    <FooterStyle>
      <div className="footerTop">
        <h2>Réseaux sociaux</h2> 
        <ul>
          {socials.map((elt, i) => (
            <li className="iconSocial" key={i}>
              <Link href={elt.link} title={elt.title}>
                <a target="_blank">
                  {elt.icon}
              </a></Link>
            </li>
          ))}
        </ul>
        <NewsletterSubscribe/>
        <div className="policy">
          <Link href="#" title="Politique de confidentialité"><a target="_blank">Politique de confidentialité</a></Link>
          <Link href="#" title="Mentions légales"><a target="_blank">Mentions légales</a></Link>
        </div>
      </div>
      <div className="footerBottom">
        <p>© LESTE INC 2022 Tout droit réservé.</p>
      </div>
    </FooterStyle>
  )
}
