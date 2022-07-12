import styled from "styled-components"
import Link from "next/link"
import NewsletterSubscribe from "./NewsletterSubscribe"
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { useRouter } from "next/router";

const FooterStyle = styled.footer`
      border-radius: 25px 25px 0 0;
    &.hideFooter{
      display: none;
    }
    .footerTop{
      color:#F4F4F4;
      background-color:#212F89;
      padding:50px 25px;
      @media (min-width: 768px) {
        padding: 50px 8% ;
      }
      h2,
      label{
        font-size:1em;
        text-transform:uppercase;
        font-weight:bold;
        display:block;
        margin-bottom: 15px;
      }
      .footerWrapper{
        display: flex;
        flex-direction: column;
        gap: 20px;
        @media (min-width: 768px){
          flex-direction: row;
        }
        .networkSocial,
        .newsletter{
          width: 100%;
          @media (min-width: 768px){
            flex: 1;
            width: auto;
          }
        }
        .networkSocial{
          @media (min-width: 768px){
            order: 2;
          }
        }
        .newsletter{
          @media (min-width:768px){
            .newsletter-input-fields{
              max-width: 340px;
            }
          }
        }
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
          text-align: left;
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
        @media (min-width: 768px){
          align-items: flex-end;
        }
      }
      
    }
    .footerBottom{
      padding:25px 25px;
      text-align:center;
      @media (min-width: 768px){
        text-align: right; 
        padding: 25px 8% ;
      }
    }
`

export default function Footer() {
  const router = useRouter()
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
    <FooterStyle className={`${router.pathname == '/experience/login' ? ('hideFooter') : ('')}`}>
      <div className="footerTop">
      <div className="footerWrapper">
          <div className="networkSocial">
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
          </div>
          <div className="newsletter">
            <NewsletterSubscribe/>
          </div>
        </div>
        <div className="policy">
          <Link href="/legales" title="Politique de confidentialité et mentions légales"><a>Politique de confidentialité et mentions légales</a></Link>
        </div>
      </div>
      <div className="footerBottom">
        <p>© LESTE INC 2022 Tout droit réservé.</p>
      </div>
    </FooterStyle>
  )
}
