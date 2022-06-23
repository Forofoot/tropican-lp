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
        
        .gradient_position_color{
            right: -20px;
            top: 0px;
            background: #4BA6FB;
        }
        h1{
            font-size: 4em;
            margin-bottom: 55px ;
        }
        .highlight{
            text-transform: uppercase ;
        }
        h2{
            margin-bottom: 75px ;
        }
        /* .containerScroll{
            position: absolute;
            width: 50px;
            height: 50px;
            min-height:50px;
            min-width:50px;
            bottom: 100px;
        } */
        .container__info{
            color: #484F75;
        }
        p{
            margin-bottom: 105px;
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
                text-align: left;
                margin-bottom: 25px;
            }
            h2{
                margin-bottom: 32px;
            }
            p{
                position: absolute;
                padding: 2px 40px 2px 5px;
                line-height: 28px;
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
        <div className="gradient gradient_position_color"></div>
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
                <h1>Vivez des expérineces,<br></br>exceptionnelles</h1>
                <h2>Nous vous aidons à embellir vos liens</h2>
            </div>
            <div>
                <Link href="/">
                    <p className='btn'>
                        <a>
                        Découvrir
                        </a>
                    </p>
                    
                </Link>
            </div>
            <div className='containerScroll'>
                <Image
                    src={"/hero/scrolldown.webp"}
                    alt='Indicateur de scroll'
                    layout='raw'
                    width='50px'
                    height='50px'
                />
            </div>
            </div>
        </HeroStyle>
    )
}

export default Hero;