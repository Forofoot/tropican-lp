import styled from "styled-components"
import Image from 'next/image'

const ReviewStyle = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:100%;
    @media (min-width:1024px){
        min-height: 70vh;
    }
    .cardsContainer{
        display: flex;
        flex-direction: column;
        gap:10px;
        width: 100%;
        padding: 30px 0;
        @media (min-width:1024px){
            display: grid;
            grid-template-rows: 400px;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 50px;
        }
        @media (max-width:764px){
            flex-direction: row;
            flex-wrap:wrap;
        }
    
        .cardTestimony{
            max-width: 440px;
            min-height: 100%;
            @media (min-width:1024px){
                min-height: 350px;
            }
            h2{
                margin-bottom:20px;

            }

            :nth-child(2n+1){
                h2{
                    color: #FED745;
                }
            }
            :nth-child(2n+0){
                h2{
                    color: #4BA6FB;
                }
            }
        }
    }
`
export default function Review() {
    let cards = [
        {
            name: 'Jérémy Ferrier',
            testimony: 'J’ai pu profiter d’un court et magnifique séjour avec mes petits-enfants. C’était super sympa les petits ont hâte qu’on reparte ensemble. On a adoré!',
        },
        {
            name: 'Marine Tourret',
            testimony: 'Nous avons passer un séjour exceptionnel grâce à Leste. Mes loulous et moi avons trouvé des centres d’intérets communs, ce que nous avions pas forcément auparavant.',
        }
    ]
    return (
        <ReviewStyle id="section3">
            <h2>Ils nous partagent avec fougue leurs retours</h2>
            <div className="cardsContainer">
                {cards.map((elt, i) => (
                    <div key={i} className="cardTestimony card">
                        <h2>{elt.name}</h2>
                        <p className="testimony">{elt.testimony}</p>
                    </div>
                ))}
            </div>
        </ReviewStyle>
    )
}
