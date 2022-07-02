import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"

const BrandsStyle = styled.section`
    height:100%;
    @media (min-width: 768px) {
        align-items: center;
    } 
   
   .titleStyled{ 
       @media (min-width:768px){
           text-align: center;
           span{
               &:first-child{
                   margin-right: 200px;
               }
           }
       }
   }
   .brandSection{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        .brandsContainer{
            overflow-x: scroll;
            align-items: center;
            scroll-behavior: smooth;
            width: 100%;
            display: flex;
            gap: 50px;
            &::-webkit-scrollbar { width: 0 !important };
            @media (min-width:1024px){
                overflow-x: hidden;
                justify-content: center;
            }
            .pictureBlock{
                padding: 50px 10px;
                .picture{
                    display: flex;
                    align-items: center;
                    position: relative;
                    min-width: 125px;
                    width: 125px;
                    height: 100%;
                    span, img{
                        position: relative!important;
                        width: 100%!important;
                        height: 100%!important;
                    }
                    @media (min-width:1024px){
                        min-width: 150px;
                    }
                }
            }
        }
        .btnPrimary{
            margin-top: 30px;
            margin: 30px auto auto auto;
            @media (min-width:1024px){
                margin-top: 0;
            }
        }
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
            }
            })
        }, {threshold: 0.7})

        brands.forEach(elt => {
            containerio.observe(elt)
        });
    }, []);
    return (
        <BrandsStyle id="section3">
            <h2 className="titleStyled"><span>Nos</span> <span>partenaires</span></h2>
            <div className="brandSection">
                <div className="brandsContainer">
                    {brands.map((elt, i) => (
                        <div className="pictureBlock" key={i} id={`brand-${i}`} >
                            <div className="picture" data-brand="true" data-brand-number={i}>
                                <Image
                                    src={elt.img}
                                    alt={elt.title}
                                    layout='fill'
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
            </div>
        </BrandsStyle>
    )
}
