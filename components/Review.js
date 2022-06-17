import styled from "styled-components"
import Image from 'next/image'

const ReviewStyle = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 50px;
    @media (min-width:1024px){
        height: 70vh;
    }
    h1{
        color: #484F75;
        font-weight: 400;
        text-align: center;
        margin-bottom: 50px;
        span{
            font-weight: bold;
        }
    }
    .cardsContainer{
        display: grid;
        width: 100%;
        grid-template-columns: repeat(1, 1fr);
        gap: 150px;
        grid-template-rows: 400px;
        align-items: center;
        justify-items: center;
        padding: 50px 0;
        @media (min-width:1024px){
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 50px;
        }
    
        .cardTestimony{
            max-width: 440px;
            border: solid 2px #42A0B6;
            border-radius:7px;
            text-align:center;
            padding: 0 20px 20px;
            min-height: 100%;
            @media (min-width:1024px){
                min-height: 350px;
            }
            .profil{
                border-radius:50%;
                width: 90px;
                height: 90px;
                margin:auto;
                transform:translate(0, -50%);
                background-color: #42A0B6;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            h2{
                color: #F0E5C3;
                text-align: center;
            }

            .statut{
                text-align:center;
                color:#484F75;
            }

            .testimony{
                text-align: left;
                color:#484F75;
            }
        }
    }
    .leafBackground{
        position: absolute;
        left: 0;
        bottom: -50px;
        @media(min-width:1024px){
            left: auto;
            right: 0;
            transform: scaleX(-1);
        }
    }
`
export default function Review() {
    let cards = [
        {
            srcPhoto: '/logo.svg',
            name: 'Jérémy Ferrier',
            statut: 'Grand-Père',
            testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
        },
        {
            srcPhoto: '/logo.svg',
            name: 'Marine Tourret',
            statut: 'Grand-Mère',
            testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
        },
        {
            srcPhoto: '/logo.svg',
            name: 'Jimmy Renden',
            statut: 'Grand-Père',
            testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        }
    ]
    return (
        <ReviewStyle id="section3">
            <h1>Vos <span>avis</span> et <span>ressentis</span> comptes</h1>
            <div className="cardsContainer">
                {cards.map((elt,i) => (
                    <div key={i} className="cardTestimony">
                        <figure className="profil">
                            <Image
                                src={elt.srcPhoto}
                                alt="photo profil"
                                width={53}
                                height={53}
                            />
                        </figure>
                        <h2>{elt.name}</h2>
                        <p className="statut">{elt.statut}</p>
                        <p className="testimony">{elt.testimony}</p>
                    </div>
                ))}
            </div>
            <div className='leafBackground'>
                <Image
                src={"/hero/img_hero.svg"}
                alt="image d'une feuille "
                width={450}
                height={450}
                
                />
            </div>
        </ReviewStyle>
    )
}
