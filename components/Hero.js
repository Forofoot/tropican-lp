import styled from 'styled-components'
import GlobalCSS from '../styles/global.css'
import Image from 'next/image'
import Link from 'next/link'

const HeroStyle = styled.div`
    .container{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 95vh;
        padding: 0 50px;
        
        .gradient_position_blue{
            right: -20px;
            top: 0px;
            background: #4BA6FB;
        }
        
        h1{
            font-size: 4em;
            margin-bottom: 55px;
            text-align: center;
        }
        .highlight{
            text-transform: uppercase ;
        }
        h2{
            margin-bottom: 75px ;
        }
        .containerInfo{
            .gradient_position_yellow{
                left: -70px;
                bottom: 40px;
                background: #FED745;
            }
        }
        .container__info{
            color: #484F75;
        }
        a{
            color: #fff;
        }
        .btnDefault{
            margin-bottom: 105px;
        }
        .containerScroll{
            display: flex;
            flex-direction: column;
            align-items: center;
            .scrollIndicator{
                border: 1px solid #fff;
                width: 30px;
                height: 60px;
                border-radius: 27px;
                text-align: center;
                position: relative;
                margin-bottom: 5px;
                div{
                    width: 15px;
                    height: 15px;
                    background-color: #fff;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 2px;
                    border-radius: 50%;
                }
            }
        }
    }

    @media (max-width:768px){
        .container{
            justify-content: start;
            height: inherit;
            padding: 0 20px ;
            .hero__banner{
                margin: 50px 0;
            }
            h1{
                font-size: 2em;
                margin-bottom: 25px;
            }
            h2{
                margin-bottom: 32px;
            }
            .containerInfo{
                margin-top: 55px;
                line-height: 1.875rem;
            }
            .containerScroll{
                margin-bottom: 60px ;
            }
        }
    }
`

const Hero = () => {
    return (
        <HeroStyle id="section1">
        <div className='container'>
        <div className="gradient gradient_position_blue"></div>
            <div className='hero__banner'>
                <Image
                    src={"/hero/image_banner.webp"}
                    alt="Image banner d'une cabane dans un arbre"
                    layout='raw'
                    width='350px'
                    height='350px'
                />
            </div>
            <div className='containerInfo'>
                <h1>Vivez des expériences,<br></br>exceptionnelles</h1>
                <p>Nous vous aidons à transcender vos liens</p>
                <div className="gradient gradient_position_yellow"></div>
            </div>
            <div className='btnDefault btnPrimary'>
                <Link href="/">
                    <p className='btn'>
                        <a>
                        Découvrir
                        </a>
                    </p>
                    
                </Link>
            </div>
            <div className='containerScroll'>
                <div className='scrollIndicator'>
                    <div className='scrollIndicator'></div>
                </div>
                <p>Dérouler</p>
            </div>
            </div>
        </HeroStyle>
    )
}

export default Hero;