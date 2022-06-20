import styled from "styled-components"
import Image from "next/image"

const InfoStyle = styled.section`
    background-color:#42A0B6;
    color:#FFF;
    border-radius: 25px 25px 0 0;
    padding: 80px 50px;
    text-align: center;
    margin-bottom:50px;
    h1{
        font-weight: 400;
        color:#F0E5C3;
        white-space: nowrap;
        margin-bottom: 15px;
    }.infoLogoContainer{
        width: 259px;
        height: 58px;
        position: relative;
        margin: auto;
        min-width: 186px;
        min-height: 42px;
        @media (max-width: 768px){
            width: 186px;
            height: 42px;
        }
    }
    .infosContainer{
        display: flex;
        flex-wrap: wrap;
        margin-top: 50px;
        justify-content: space-between;
        .infoBlock{
            width: 100%;
                h2{
                    display: none;
                }
                .infoText{
                font-weight: 100;
                margin-bottom: 25px;
                span{
                    font-weight: bold;
                }
            }
        }
        
        @media (min-width: 768px){
            text-align: left;
            .infoBlock{
                width: 25%;
                h2{
                    display: block;
                }
            }
        }
    }
`

export default function Footer() {
    
  return (
    <InfoStyle id="section2">
        <h1>Qui sommes-nous ?</h1>
        <div className="infoLogoContainer">
            <Image
                src={'/fullLogo.webp'}
                alt="Logo Tropican"
                layout="raw"
                width='259px'
                height='58px'
            />
        </div>
        <div className="infosContainer">
            <div className="infoBlock">
                <h2>Notre mission</h2>
                <p className="infoText">
                    <span>Tropican</span> est une agence de communication qui a pour objectif principal faciliter et de valoriser les échange des grand-parents avec leur petits enfants.
                </p>
            </div>
            <div className="infoBlock">
                <h2>Nos actions</h2>
                <p className="infoText">
                    <span>Tropican</span> est une agence de communication qui a pour objectif principal faciliter et de valoriser les échange des grand-parents avec leur petits enfants.
                </p>
            </div>
            <div className="infoBlock">
                <h2>Notre mission</h2>
                <p className="infoText">
                    <span>Tropican</span> est une agence de communication qui a pour objectif principal faciliter et de valoriser les échange des grand-parents avec leur petits enfants.
                </p>
            </div>
        </div>
    </InfoStyle>
  )
}
