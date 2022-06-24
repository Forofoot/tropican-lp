import styled from "styled-components"
import { useEffect } from "react";
import Image from "next/image";

const ReviewStyle = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    height:100%;
    @media (min-width: 768px) {
        align-items: center;
    }
    h2{
        color: #7159AD;
    }
    .cardsContainer{
        display: flex;
        overflow-x: scroll;
        gap:40px;
        width: 100%;
        padding: 30px 10px;
        &::-webkit-scrollbar { width: 0 !important };
        @media (min-width:1024px){
            overflow-x: hidden;
            display: flex;
            justify-content: space-around;
            flex-direction: row;
        }
        .cardTestimony{
            width: 100%;
            min-height: 100%;
            @media (min-width:1024px){
                min-height: 250px;
                max-width: 450px;
            }
            .title{
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 15px;
                .picture{
                    border-radius: 50%;
                    width: 73px;
                    height: 73px;
                    max-width: 73px;
                    max-height: 73px;
                }
                h2{
                    margin-bottom:0;
                } 
            }
           
            .testimony{
                margin-bottom: 20px;
            }
        }
        
        .card{
            min-width: 100%;
            
            box-shadow: 0px 0px 10px rgba(113, 89, 173, 0.5);
            h2{
                color: #7159AD;
            }
            :nth-child(2n+1){
                box-shadow: 0px 0px 10px rgba(20,117,67, 0.5);
                h2{
                    color: #147543;
                }
            }
            &:last-child{
                margin-right: 0;
            }
            @media (min-width: 768px){
                min-width: auto;
            }
        }
    }
    .slideIndicatorContainer{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin: auto;
        @media (min-width: 768px){
            display: none;
        }
        .slideIndicator{
            width: 30px;
            height: 3px;
            background: #14754399;
            transition: width .3s linear;
            will-change: transition;
            &.current{
                width: 60px;
                background-color: #147543;
            }
        }
    }
`
export default function Review({cards}) {
    useEffect(() => {
        let reviews = document.querySelectorAll('[data-info]')
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

        reviews.forEach(elt => {
            containerio.observe(elt)
        });
    }, []);
    return (
        <ReviewStyle id="section3">
            <h2>C&apos;est vous qui le dites ! </h2>
            <div className="cardsContainer">
                {cards.map((elt, i) => (
                    <div key={i} className="cardTestimony card" data-info="true" data-info-number={i}>
                        <div className="title">
                            <div className="picture">
                                <Image
                                    src={elt.img}
                                    alt={elt.name}
                                    height={73}
                                    width={73}
                                />
                            </div>
                            <h2>{elt.name}</h2>
                        </div>
                        
                        <p className="testimony">{elt.testimony}</p>
                        <p className="date">{elt.date}</p>
                    </div>
                ))}
            </div>
            <div className="slideIndicatorContainer">
                <div className="slideIndicator" data-slide-number='0' data-slide-indicator="true"></div>
                <div className="slideIndicator" data-slide-number='1' data-slide-indicator="true"></div>
                <div className="slideIndicator" data-slide-number='2' data-slide-indicator="true"></div>
            </div>
        </ReviewStyle>
    )
}
