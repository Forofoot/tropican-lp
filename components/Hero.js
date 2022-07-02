import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

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
    return (
        <HeroStyle id="section1">
            <div className='heroBanner'>
                <Image
                    src={"/hero/image_banner.webp"}
                    alt="Image banner d'une cabane dans un arbre"
                    layout='raw'
                    width='350px'
                    height='350px'
                    priority
                />
            </div>
            <div className='containerInfo'>
                <h1>Vivez des expériences,<br></br>exceptionnelles</h1>
                <p>Nous vous aidons à transcender vos liens</p>
            </div>
            <div className='btnPrimary'>
                <Link href="/experience/dashboard">
                    <a className='btn'>
                        Découvrir
                    </a>
                </Link>
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