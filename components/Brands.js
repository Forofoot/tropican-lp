import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"

const BrandsStyle = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    height:100%;
    @media (min-width: 768px) {
        align-items: center;
    } 
    
    .brandsContainer{
        display: flex;
        overflow-x: scroll;
        align-items: center;
        scroll-behavior: smooth;
        width: 100%;
        gap: 50px;
        &::-webkit-scrollbar { width: 0 !important };
        @media (min-width:1024px){
            overflow-x: hidden;
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        .pictureBlock{
        padding: 50px 10px;
            .picture{
                display: flex;
                align-items: center;
                
                img{
                    max-width: 200px;
                    min-height: 100%;
                }
            @media (min-width:1024px){
                min-height: 250px;
                max-width: 450px;
                }
            }
        }
    }
    .btnPrimary{
        margin-top: 30px;
        margin: 30px auto auto auto;
    }
`
export default function Brands({brands}) {
    useEffect(() => {
        let brands = document.querySelectorAll('[data-brand]')
        let brandslideIndicator = document.querySelectorAll('[data-brand-slide-indicator]')

        const containerio = new IntersectionObserver(entries => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                brandslideIndicator.forEach(elt => {
                    if(entry.target.getAttribute('data-brand-number') === elt.getAttribute('data-brand-slide-number')){
                        elt.classList.add('current');
                    }else{
                        elt.classList.remove('current');
                    }
                });
                console.log(entry.target)
            }
            })
        }, {threshold: 1})

        brands.forEach(elt => {
            containerio.observe(elt)
        });
    }, []);
    return (
        <BrandsStyle id="section3">
            <h2>Nos partenaires</h2>
            <div className="brandsContainer">
                {brands.map((elt, i) => (
                    <div className="pictureBlock" key={i} id={`brand-${i}`} >
                        <div className="picture" data-brand="true" data-brand-number={i}>
                            <Image
                                src={elt.img}
                                alt={elt.title}
                                layout='raw'
                                height={elt.height}
                                width={elt.width}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="slideIndicatorContainer">
                <Link href={'#brand-0'}>
                    <a>
                        <div className="slideIndicator" data-brand-slide-number='0' data-brand-slide-indicator="true"></div>
                    </a>
                </Link>
                <Link href={'#brand-4'}>
                    <a>
                        <div className="slideIndicator" data-brand-slide-number='4' data-brand-slide-indicator="true"></div>
                    </a>
                </Link>
            </div>
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
