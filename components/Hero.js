import styled from 'styled-components'
import Image from 'next/image'

const HeroStyle = styled.div`
    .container{
        padding:75px 45px;
        height: 60vh;
        .scroll_anim{
            display:flex;
            justify-content: center ;
        }
        .highlight{
            text-transform: uppercase;
        }
        h1{
            text-align: center;
            margin-bottom: 25px;
        }
        h2{
            margin-bottom: 32px;
        }
        p{
            position: absolute ;
        }
        .container__scroll{
            display: flex;
            justify-content:center ;
        }.container__info{
            margin-bottom: 15px ;
        }
        .container__image {
            position: relative;
            z-index: -1;
            top: 15px;
        }
    }
`

const Hero = () => {
    return (
        <HeroStyle>
        <div className='container'>
            <div className='container__info'>
                <h1>Vivre en, <span className='highlight'>intégrations</span></h1>
                <h2>Facilité les liens et les transmissions familiales</h2>
                <p>Souhaitez-vous faciliter les interractions avec vos petits enfants ? Créer du lien à travers ce que vous aimez avec eux sans crainte !</p>
                <div className='container__image'>
                    <Image
                    src="/hero/img_hero.svg"
                    alt="image d'une feuille "
                    width={250}
                    height={250}
                    />
                </div>
            </div> 
            <div className='container__scroll'>
                <Image
                    src="/hero/scrolldown.svg"
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