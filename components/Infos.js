import styled from "styled-components"
import { useEffect } from "react";

const InfoStyle = styled.section`
    color:#FFF;
    border-radius: 25px 25px 0 0;
    text-align: center;
    margin-bottom:75px;
    position:relative;
    @media (min-width: 768px){
        margin-bottom: 125px;
    }
    .gradient_position_color{
        left: -20px;
        top: 0px;
        background: #4BA6FB;
    }
    h1{
        font-weight: 400;
        color:#F0E5C3;
        white-space: nowrap;
        margin-bottom: 15px;
    }
    .infosContainer{
        display: flex;
        padding: 25px 0;
        justify-content: space-between;
        overflow-x: scroll;
        ::-webkit-scrollbar { width: 0 !important }
        .card{
            min-width: 95%;
            margin-right: 10%;
            color: #fff;
            &:last-child{
                margin-right: 0;
            }
            h2{
                color: #4BA6FB;
                margin-bottom: 25px;
            }
            &:nth-child(2n+1){
                h2{
                    color:#FED745;
                }
            }
        }
        
        @media (min-width: 768px){
            text-align: left;
            overflow-x: hidden;
            .card{
                min-width: auto;
                max-width: 500px;
            }
        }
    }
    .slideIndicatorContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        @media (min-width: 768px){
            display: none;
        }
        .slideIndicator{
            width: 30px;
            height: 2px;
            background: #FED74599;
            transition: width .3s linear;
            will-change: transition;
            &.current{
                width: 60px;
                background-color: #FED745;
            }
        }
    }
`

export default function Infos({ infos }) {
    useEffect(() => {
        let infos = document.querySelectorAll('[data-info]')
        let slideIndicator = document.querySelectorAll('[data-slide-indicator]')

        const containerio = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                slideIndicator.forEach(elt => {
                    if(entry.target.getAttribute('data-info-number') === elt.getAttribute('data-slide-number')){
                        elt.classList.add('current');
                    }else{
                        elt.classList.remove('current');
                    }
                });
              }
            })
        }, {threshold: 0.7})

        infos.forEach(elt => {
            containerio.observe(elt)
        });
    }, []);
  return (
    <InfoStyle id="section2">
        <div className="gradient gradient_position_color"></div>
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
        <div className="slideIndicatorContainer">
            <div className="slideIndicator" data-slide-number='0' data-slide-indicator="true"></div>
            <div className="slideIndicator" data-slide-number='1' data-slide-indicator="true"></div>
            <div className="slideIndicator" data-slide-number='2' data-slide-indicator="true"></div>
        </div>
    </InfoStyle>
  )
}
