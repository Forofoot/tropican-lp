import styled from "styled-components"

const InfoStyle = styled.section`
    border-radius: 25px 25px 0 0;
    text-align: center;
    position:relative;
    @media (min-width: 768px){
        margin-bottom: 125px;
    }
    h1{
        font-weight: 400;
        color:#F0E5C3;
        white-space: nowrap;
        margin-bottom: 15px;
    }
    .infosContainer{
        padding: 25px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export default function Infos({ infos }) {
  return (
    <InfoStyle id="section2">
        <div className="infosContainer">
            {infos.map((info, i)=>(
                <div key={i} className="card infoBlock" data-info="true" data-info-number={i}>
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
