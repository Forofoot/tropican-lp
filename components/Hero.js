import styled from 'styled-components'
import Image from 'next/image'

const HeroStyle = styled.div`
    .container{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 95vh;
        padding: 0 50px;
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
        .container__scroll{
            position: absolute;
            bottom: 100px;
        }
        .container__info{
            color: #484F75;
        }
        .container__image--mobile {
            position: absolute;
            z-index: -1;
            top: -50px;
            left: 0;
            transform: rotate(105deg);
        }
        p{
            margin-bottom: 105px;
        }
    }

    @media (max-width:768px){
        .container{
            justify-content: start;
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
            .container__info{
                margin-top: 55px;
            }
            .container__image--mobile {
                position: absolute;
                z-index: -1;
                top: auto;
                bottom:-50px;
                left: 0;
                transform: rotate(0deg);
            }
        }
    }
`

const Hero = () => {
    return (
        <HeroStyle id="section1">
        <div className='container'>
            <div className='container__info'>
                <h1>Vivre en,<br></br> <span className='highlight'>intergénérations</span></h1>
                <h2>Facilité les liens et les transmissions familiales</h2>
                <p>Souhaitez-vous faciliter les interractions avec vos petits enfants ? Créer du lien à travers ce que vous aimez avec eux sans crainte !</p>
                <div className='container__image--mobile'>
                    <Image
                    src={"/hero/img_hero.svg"}
                    alt="image d'une feuille "
                    width={450}
                    height={450}
                    
                    />
                </div>
            </div> 
            <div className='container__scroll'>

                <Image
                    src={"/hero/scrolldown.svg"}
                    alt=''
                    width={50}
                    height={50}
                />

            </div>
        </div>
        </HeroStyle>
    )
}

export default Hero;