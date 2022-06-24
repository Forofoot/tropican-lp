import styled from "styled-components"

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
        justify-content: center;
        align-items: center;
        gap:60px;
        width: 100%;
        padding: 50px 0;
        @media (min-width:1024px){
            display: flex;
            justify-content: space-around;
            flex-direction: row;
        }
    
        .cardTestimony{
            width: 100%;
            min-height: 100%;
            @media (min-width:1024px){
                min-height: 350px;
                max-width: 450px;
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
export default function Review({cards}) {
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
