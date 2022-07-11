import styled from "styled-components"
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link"

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
        scroll-behavior: smooth;
        gap:40px;
        width: 100%;
        &::-webkit-scrollbar { width: 0 !important };
        @media (min-width:1024px){
            overflow-x: hidden;
            display: flex;
            justify-content: space-around;
            flex-direction: row;
        }
        .cardBlock{
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 100%;
            padding: 30px 10px;

            :nth-child(2n+1) .cardTestimony{
                background-color:#6B86FF;
                .title{
                    h2{
                        color:#fff;
                    }
                }
            }

            :nth-child(2n+2) .cardTestimony{
                background-color:#212F89;
                .title{
                    h2{
                        color:#fff;
                    }
                }
            }

            @media (min-width:1024px){
                display: block;
                min-width: auto;
            }
            .cardTestimony{
            width: 98%;
            min-height: 100%;
            color:#fff;
            @media (min-width:1024px){
                min-height: 300px;
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
                min-width: 95%;
                
                box-shadow: 0px 0px 10px rgba(113, 89, 173, 0.5);
                h2{
                    color: #7159AD;
                }
                @media (min-width: 768px){
                    min-width: auto;
                }
            }
            
            :nth-child(2n+1){
                .card{
                    box-shadow: 0px 0px 10px rgba(20,117,67, 0.5);
                    h2{
                        color: #147543;
                    }
                }
            }
        }
    }
`
export default function Review({cards}) {
    useEffect(() => {
        let reviews = document.querySelectorAll('[data-info]')
        let slideIndicator = document.querySelectorAll('[data-info-slide-indicator]')

        const containerio = new IntersectionObserver(entries => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                slideIndicator.forEach(elt => {
                    if(entry.target.getAttribute('data-info-number') === elt.getAttribute('data-info-slide-number')){
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
                    <div key={i} id={`review-${i}`} className="cardBlock">
                        <div className="cardTestimony card" data-info="true" data-info-number={i}>
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
                    </div>
                ))}
            </div>
            <div className="slideIndicatorContainer">
                <Link href={'#review-0'}>
                    <a>
                        <div className="slideIndicator" data-info-slide-number='0' data-info-slide-indicator="true"></div>
                    </a>
                </Link>
                <Link href={'#review-1'}>
                    <a>
                        <div className="slideIndicator" data-info-slide-number='1' data-info-slide-indicator="true"></div>
                    </a>
                </Link>
                <Link href={'#review-2'}>
                    <a>
                        <div className="slideIndicator" data-info-slide-number='2' data-info-slide-indicator="true"></div>
                    </a>
                </Link>
            </div>
            <div className="infoBackground bottom">
                <Image
                    src={"/infos/infosBackground.svg"}
                    alt="Épingle"
                    height={218}
                    width={133}
                />
            </div>
        </ReviewStyle>
    )
}
