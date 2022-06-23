import styled from "styled-components"
import Image from "next/image"

const InfoStyle = styled.section`
    color:#FFF;
    border-radius: 25px 25px 0 0;
    text-align: center;
    margin-bottom:50px;
    h1{
        font-weight: 400;
        color:#F0E5C3;
        white-space: nowrap;
        margin-bottom: 15px;
    }
    .infosContainer{
        display: flex;
        margin-top: 50px;
        justify-content: space-between;
        overflow-x: scroll;
        padding: 10px;
        ::-webkit-scrollbar { width: 0 !important }
        .card{
            min-width: 95%;
            margin-right: 10px;
            color: #313131;
            text-align: left;
            line-height: 26px;
            &:last-child{
                margin-right: 0;
            }
            h2{
                color: #4BA6FB;
                margin-bottom: 25px;
                font-weight: 400;
            }
            &:nth-child(2n+1){
                h2{
                    color:#FED745;
                }
            }
        }
        @media (min-width: 768px){
            text-align: left;
        }
    }
`

export default function Footer() {
    let infos =[ 
        {
            title : 'Qui sommes-nous ?',
            description : "Leste est le meilleur dispositif qui a pour but de créer des voyages et des activités entre grands-parents et petits-enfants pour renfoncer leurs formidable liens."
        },
        {
            title : 'Comment ?',
            description : "Leste vous permets d’organiser des voyages et des activités extraordinaires en France, entre grands-parents et petits-enfants tout en ayant la possibilité de les personnaliser."
        },
        {
            title : 'Avec qui ?',
            description : "Grâce à nos merveilleux partenaires et nos équipes prodigieuses nous vous accompagnons tout au long de vos voyages et/ou vos activités."
        }
        
    ]
    
  return (
    <InfoStyle id="section2">
        <div className="infosContainer">
            {infos.map((info, i)=>(
                <div key={i} className="card infoBlock">
                    <h2>{info.title}</h2>
                    <p>
                        {info.description}
                    </p>
                </div>
            ))}
        </div>
    </InfoStyle>
  )
}
