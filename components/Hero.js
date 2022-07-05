import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const HeroStyle = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 95vh;
    padding: 0 50px;

    .heroBanner{
        margin: 20px 0;
        border-radius: 10px;
        overflow:hidden;
        position:relative;
        width:90vw;
        height:50vh;
    }
    .star{
        display:none;
    }
    .absolute_banner{
        text-align:center;
        margin-bottom:50px;
    }
    .containerInfo{
        h1{
            margin-bottom: 15px;
            text-align: center;
        }
        p{
            margin-bottom: 25px;
        }
    }
    .highlight{
        text-transform: uppercase ;
    }
    .container__info{
        color: #484F75;
    }
    .btnPrimary{
        margin-bottom: 40px;
    }
    .btn{
        padding: 15px 30px;
    }
    .containerScroll{
        display: flex;
        flex-direction: column;
        align-items: center;
        .scrollIndicator{
            border: 1px solid #313131;
            width: 30px;
            height: 60px;
            border-radius: 27px;
            text-align: center;
            position: relative;
            margin-bottom: 5px;
            div{
                width: 15px;
                height: 15px;
                background-color: #313131;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 2px;
                border-radius: 50%;
                animation: bounce 3s ease infinite;
            }
        }
    }
    @media (min-width: 768px){
        .containerScroll{
            position:absolute;
            color:#fff;
            bottom:50px;

            .scrollIndicator{
                border-color: #fff;
                .scrollIndicator{
                    background-color:#fff;
                }
            }
        }
        .heroBanner{
            margin: 0;
            border-radius: 0;
            width:100vw;
            height:calc(100vh);
        }
        .absolute_banner{
            position: absolute;
            top:20%;
        }

        .star{
            display:block;
            z-index:2;
            position: absolute;

            :hover{
                cursor:pointer;
            }
        }

        #over_1{
            top: 30px;
            right:100px;
            fill: #147543;
        }
        #over_2{
            top: 170px;
            right:120px;
            fill: #F20D97;
        }
        #over_3{
            top: 150px;
            left:100px;
            fill: #212F89;
        }
    }

    @media (max-width:768px){
        justify-content: start;
        height: inherit;
        padding: 0 20px ;

        h1{
            font-size: 2em;
            margin-bottom: 25px;
        }
        h2{
            margin-bottom: 32px;
        }
        .containerInfo{
            margin-top: 25px;
            line-height: 1.875rem;
        }
        .containerScroll{
            bottom: 0;
            position: relative;
        }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {transform: translate(-50%, 0);}
	    40% {transform: translate(-50%, -25px);}
	    60% {transform: translate(-50%, -15px);}
    }
`

const Hero = () => {
    const firstStar = useRef()
    const secondStar = useRef()
    const thirdStar = useRef()

    
    useEffect(() => {
        console.log('chargé');
        firstStar.current.addEventListener('mouseenter', function(e){
            console.log(this.id)
        })
        /*document.getElementsByClassName('star').addEventListener("mouseenter", function( event ) {
            console.log('1');
            var id = (event.target.id);
            document.querySelector(".image_banner img").src="banner_over_"+id+".webp";
        })
        document.getElementsByClassName('star').addEventListener("mouseleave", function( event ) {
            console.log('2');
            document.querySelector(".image_banner img").src="/hero/image_banner.webp";
        })*/
        
    })
    return (
        <HeroStyle id="section1">
            <div className='star' id="over_1" ref={firstStar}>
                <Image
                    src={"/star.svg"}
                    alt="étoile"
                    width='35px'
                    height='35px'
                    fill='#147543'
                    
                />
            </div>
            <div className='star' id="over_2" ref={secondStar}>
                <Image
                    src={"/star.svg"}
                    alt="étoile"
                    width='20px'
                    height='20px'
                    fill='#147543'
                />
            </div>
            <div className='star' id="over_3" ref={thirdStar}>
                <Image
                    src={"/star.svg"}
                    alt="étoile"
                    width='25px'
                    height='25px'
                    fill='#147543'
                />
            </div>
            <div className='heroBanner'>
                <Image
                    src={"/hero/image_banner.webp"}
                    alt="Image banner d'une cabane dans un arbre"
                    layout='fill'
                    objectFit='cover'
                    priority
                />
            </div>
            <div className="absolute_banner">
            <div className='containerInfo'>
                <h1>Vivez des expériences,<br></br>exceptionnelles</h1>
                <p>Nous vous aidons à transcender vos liens</p>
            </div>
            <div className='btnPrimary'>
                <Link href="/experience/login">
                    <a className='btn'>
                        Découvrir
                    </a>
                </Link>
            </div>
            </div>
            <div className='containerScroll'>
                <div className='scrollIndicator'>
                    <div className='scrollIndicator'></div>
                </div>
                <p>Dérouler</p>
            </div>
            
        </HeroStyle>
    )
}

export default Hero;