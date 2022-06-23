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
        .containerScroll{
            position: absolute;
            width: 50px;
            height: 50px;
            min-height:50px;
            min-width:50px;
            bottom: 100px;
        }
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
            }
        }
    }
`

const Hero = () => {
    return (
        <HeroStyle id="section1">
        <div className='container'>
            <div className='containerInfo'>
                <h1>Vivre en<br></br> <span className='highlight'>intergénération</span></h1>
                <h2>Faciliter les liens et les transmissions familiales</h2>
                <p>Souhaitez-vous faciliter les interractions avec vos petits enfants ? Créer du lien à travers ce que vous aimez avec eux sans crainte !</p>
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