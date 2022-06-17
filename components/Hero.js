import styled from 'styled-components'
import Image from 'next/image'

const HeroStyle = styled.div`


    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 95vh;
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
            display: flex;
            justify-content:center ;
        }
        .container__image--mobile {
            position: absolute;
            z-index: -1;
            top: 50px;
            left: 0;
            transform: rotate(105deg);
        }
        p{
            margin-bottom: 105px;
        }
    }

    @media (max-width:768px){
        .container{
            .scroll_anim{
                display:flex;
                justify-content: center ;
            }
            .highlight{
                text-transform: uppercase;
            }
            h1{
                font-size: 2em;
                text-align: center;
                margin-bottom: 25px;
                color: #484F75;
            }
            h2{
                margin-bottom: 32px;
                color: #484F75;
            }
            p{
                position: absolute;
                padding: 2px 40px 2px 5px;
                line-height: 28px;
                color: #484F75;
            }
            .container__info{
                margin-bottom: -15px ;
            }
            .container__image--mobile {
                position: relative;
                z-index: -1;
                top: 15px;
                transform: rotate(0deg);
            }
        }
    }
`

const Hero = () => {
    // const scrollIndicator = useRef()
    // let animItem = bodymovin.loadAnimation({
    //   wrapper: scrollIndicator,
    //   animType: 'svg',
    //   loop: true,
    //   path: "/public/hero/scrollDown.json"
    // });
    return (
        <HeroStyle id="section1">
        <div className='container'>
            <div className='container__info'>
                <h1>Vivre en,<br></br> <span className='highlight'>intergénérations</span></h1>
                <h2>Facilité les liens et les transmissions familiales</h2>
                <p>Souhaitez-vous faciliter les interractions avec vos petits enfants ? Créer du lien à travers ce que vous aimez avec eux sans crainte !</p>
                <div className='container__image--mobile'>
                    <Image
                    src={"hero/img_hero.svg"}
                    alt="image d'une feuille "
                    width={450}
                    height={450}
                    
                    />
                </div>
            </div> 
            <div className='container__scroll'>

                <Image
                    src={"hero/scrolldown.svg"}
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