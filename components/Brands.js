import styled from "styled-components"
import Link from "next/link"

const BrandsStyle = styled.section`
    display: flex;
    flex-direction: column;
    h2{
        margin-bottom: 60px;
    }
    .btnPrimary{
        margin: auto;
    }
`
export default function Brands() {
    return (
        <BrandsStyle id="section3">
            <h2>Nos partenaires</h2>
            <div className='btnPrimary'>
                <Link href="#">
                    <a className='btn'>
                        En savoir plus
                    </a>
                </Link>
            </div>
        </BrandsStyle>
    )
}
