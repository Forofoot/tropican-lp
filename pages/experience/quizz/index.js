import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Link from 'next/link'
import Head from 'next/head'

const PreQuizzStyle = styled.section`
  padding-top:30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 95vh;
  @media(min-width: 1024px){
    flex-direction: row-reverse;
    gap: 80px;
  }
  h1,h2{
    font-size: 1.25rem;
  }
  h1{
    text-align: center;
    margin-bottom: 30px;
    @media (min-width: 1024px) {
      font-size: 1.875em;
      text-align: left;
    }
  }
  h2{
    color:#212F89;
    font-weight: 100;
    white-space: nowrap;
    margin-bottom: 15px;
    @media (min-width: 1024px) {
      display: none;
    }
  }
  ul{
    list-style: disc;
    padding-left: 35px;
  }
  .preQuizzIntroduction{
    margin-bottom: 15px;
    .btnPrimary,
    .warningLabel{
      display: none;
    }
    @media (min-width: 1024px) {
      padding-top: 70px;
      width: 40%;
      display: flex;
      flex-direction: column;
      .btnPrimary{
        margin: 0;
        margin-top: 70px;
        margin-bottom: 40px;
      }
      .btnPrimary,
      .warningLabel{
        display: block;
      }
      .warningLabel{
        text-align: left;
      }
    }

  }
  .quizzPresentationImage{
    width: 100%;
    min-height: 350px;
    max-height: 650px;
    position: relative;
    @media (min-width: 1024px){
      width: 60%;
    }
    span{
      position: relative;
      border-radius: 10px;
    }
  }
  .btnPrimary{
    min-width: 190px;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
    transition: all ease-in-out .3s;
  }
  .warningLabel{
    text-align: center;
  }
  .mobileBlock{
    display: flex;
    align-items:center;
    flex-direction: column;
    @media (min-width: 1024px){
      display: none;
    }
  }
`

export default function PreQuizz({user, relation}) {
  return (

    <>
        <Head>
        <title>Leste - Quizz</title>
        <meta
          name="description"
          content="Démarrez notre quizz et trouvez une experience a faire"
        />
      </Head>

    <PreQuizzStyle className='container'>
      <div className='preQuizzIntroduction'>
        <h1>Quizz</h1>
        <h2>Créez votre meilleur expérience :</h2> 
        <p>
          Nous allons vous poser de magnifiques questions ! <br></br>
          Elle vont concerner :
        </p>
        <ul>
          <li>vos conditions physiques</li>
          <li>vos préférences</li>
        </ul>
        <p>
          Tout ça pour mieux vous connaître et de vous proposer votre expérience sur mesure !
        </p>
        <div className='btnPrimary btnMore hoverEffect'>
          <Link href="/experience/quizz/start" title='Commencer le quizz'>
            <a>
              Suivant
            </a>
          </Link>
        </div>

        <p className='warningLabel'>Aucune données ne sera divulguer</p>
      </div>
      <div className='quizzPresentationImage'>
        <Image
            src='/quizz/quizzPresentation.webp'
            alt='Quizz présentation Image'
            layout='fill'
            objectFit='cover'
          />
      </div>

      <div className='mobileBlock'>
        <div className='btnPrimary'>
          <Link href="/experience/quizz/start" title='Commencer le quizz'>
            <a>
              Suivant
            </a>
          </Link>
        </div>

        <p className='warningLabel'>Aucune données ne sera divulguer</p>
      </div>
    </PreQuizzStyle>
  </>)
}