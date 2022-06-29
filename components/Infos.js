import Image from 'next/image'
import styled from "styled-components"

const InfoStyle = styled.section`
    border-radius: 25px 25px 0 0;
    text-align: center;
    position:relative;
    @media (min-width: 768px){
        margin-bottom: 125px;
    }
    .info_star{
        position:absolute;
    }
    
    .info_star:nth-child(1){
        bottom:0px;
        right: 30px;
    }
    .info_star:nth-child(2){
        top:0px;
        right: 30px;
    }
    .info_star:nth-child(3){
        bottom:-15px;
        left: 20px;
    }
    h2{
        font-weight: 400;
        white-space: nowrap;
        margin-bottom: 10px;
    }
    .infosContainer{
        padding: 25px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .infoBlock{
            text-align: left;
            @media (min-width: 768px){
                max-width: 580px;
                text-align: center;
            }
            h2{
                color: #7159AD;
            }
        }
    }
`

export default function Infos({ infos }) {
    return (
        <InfoStyle id="section2">
            <div className="info_star">
                <Image
                src={"/star.svg"}
                alt="Star"
                height={35}
                width={35}
            /></div>
            <div className="info_star">
                <Image
                src={"/star.svg"}
                alt="Star"
                height={15}
                width={15}
            /></div>
            <div className="info_star">
                <Image
                src={"/star.svg"}
                alt="Star"
                height={25}
                width={25}
            /></div>
            <div className="infosContainer">
                {infos.map((info, i) => (
                    <div key={i} className="infoBlock" data-info="true" data-info-number={i}>
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
