import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import NewsletterSubscribe from "./NewsletterSubscribe"

const FooterStyle = styled.footer`
      background-color:#42A0B6;
      color:#FFF;
      border-radius: 25px 25px 0 0;
    .footerTop{
      padding:25px 50px;
      h2,
      label{
        font-size:1em;
        text-transform:uppercase;
        font-weight:100;
        display:block;
      }

      h2{
        margin-bottom: 25px;
      }
      
      ul{
        display:flex;
        margin-bottom:50px;
          .iconSocial{
          display:flex;
          align-items:center;
          justify-content:center;
          margin-right:15px;
          height:38px;
          width:38px;
          background:#F0E5C3;
          border-radius:50%;
          &:last-child{
            margin-right:0;
          }
          .iconContainer{
            width: 30px;
            height: 30px;
            position: relative;
          }
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
          img: '',
          link: 'https://www.facebook.com/'
      },
      {
          title: 'Instagram',
          img: '',
          link: 'https://www.instagram.com/'
      },
      {
          title: 'Linkedin',
          img: '',
          link: 'https://www.linkedin.com/'
      },
      {
          title: 'Twitter',
          img: '',
          link: 'https://www.twitter.com/'
      }
  ]
  
  // const submitForm = (e) =>{
  //   e.preventDefault();
  // }
  return (
    <FooterStyle>
      <div className="footerTop">
        <h2>Réseaux sociaux</h2> 
        <ul>
          {socials.map((elt, i) => (
            <li className="iconSocial" key={i}>
              <Link href={elt.link} title={elt.title}>
                <a target="_blank">
                  <div className="iconContainer">
                    <Image
                      src="/logo.webp"
                      alt={elt.title}
                      layout='raw'
                      width= '30px'
                      height= '30px'
                    />
                  </div>
                  
              </a></Link>
            </li>
          ))}
        </ul>
        {/* <form onSubmit={submitForm}>
          <label htmlFor="email">Suivre nos actualités</label >
          <input type="text" name="email" id="email" placeholder="E_mail"/>
          <span className="separator"></span>
          <button className="btnDefault">S&apos;abonner</button>
        </form> */}
        <NewsletterSubscribe/>
        <div className="policy">
          <Link href="#" title="Politique de confidentialité"><a target="_blank">Politique de confidentialité</a></Link>
          <Link href="#" title="Mentions légales"><a target="_blank">Mentions légales</a></Link>
        </div>
      </div>
    </FooterStyle>
  )
}
