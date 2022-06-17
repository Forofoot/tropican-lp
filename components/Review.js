import styled from "styled-components"
import Image from 'next/image'

const ReviewStyle = styled.div`
.cardTestimony{
    border: solid 2px #42A0B6;
    border-radius:7px;
    text-align:center;
    width:20vw;
    min-height:200px;
    height:100%;
    padding: 0 20px 20px;

    .profil{
        border-radius:50%;
        width: 90px;
        height: 90px;
        margin:auto;
        transform:translate(0, -50%);
    }

    h2{
        color: #F0E5C3;
        text-align: center;
        text-shadow:1px 1px 2px grey;
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
`
export default function Review({srcPhoto, nom, statut, testimony}) {
return (
    <ReviewStyle>
        <div className="cardTestimony">
            <figure className="profil">
                <Image
                    src={srcPhoto}
                    alt="photo profil"
                    width={53}
                    height={53}
                />
            </figure>
            <h2>{nom}</h2>
            <p className="statut">{statut}</p>
            <p className="testimony">{testimony}</p>
        </div>


    </ReviewStyle>
)
}
