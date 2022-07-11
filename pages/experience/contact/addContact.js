import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import Image from 'next/image'
import { parseCookies } from "../../../helpers"
import { PrismaClient } from '@prisma/client'


const AddContactStyle = styled.section`
    text-align: center;
    margin: auto;
    min-height: 100vh;
    @media (min-width:768px) {
      padding: 30px 130px!important;
    }
    h1{
      margin-bottom: 30px;
    }
    form{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-bottom: 40px;
      input{
        all: unset;
        padding: 15px 20px;
        border: 1px solid #F20D97;
        border-radius: 10px;
        max-width: 490px;
        width: calc(100% - 40px);
        text-align: left;
        @media (min-width:768px) {
          width: 100%;
        }
      }
    }
    .cardUser{
      border: 1px solid #212F89;
      border-radius: 10px;
      padding: 40px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 25px;
      max-width: 330px;
      margin: auto;
      position: relative;
      @media (min-width: 768px) {
        padding: 40px 55px;
      }
      img{
        border-radius: 50%;
      }
      .btnPrimary{
        padding: 15px;
      }
      .sendRequestLabel{
        display: none;
      }
      &.active{
        &::before{
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: rgba(131,215,220,.8);
          z-index: 5;
          border-radius: 10px;
          background-size: 170px;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url('/tools/addRelation.webp');
        }
        .sendRequestLabel{
          display: block;
          position: absolute;
          z-index: 20;
          top: 30px;
          font-weight: bold;
        }
      }
    }
    .myRelationContainer{
      margin-bottom: 40px;
      h2{
        text-align: left;
        color: #313131;
        font-size: 1em;
        margin-bottom: 20px;
      }
      .myRelation{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap:20px;
        @media(min-width:768px){
          display: flex;
          align-items: center;
        }
        .cardUser{
          margin: 0;
        }
      }
    }
    .findResult{
      min-height: 400px;
    }
`

export default function AddContact({friendRequest}) {
  const errormessage = useRef()
  const cardUser = useRef()

  const [cookies] = useCookies(['user'])
  const [currentUser, setCurrentUser] = useState(null)

  const [datas, setDatas] = useState([])
  const [inputedFriend, setInputedFriend] = useState({
    pseudo: "",
  })
  const [error, setError] = useState()


  useEffect(() => {
    setCurrentUser(cookies.user)
  }, [cookies.user]);

  const handleAddUser = async(relation) => {
    const res = await fetch('/api/contact/addFriend', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          currentUser: currentUser?.pseudo,
          pseudo: relation,
          role: currentUser?.role
      }),
    });
    if(res.ok){
      cardUser.current.classList.add('active')
    }
  }

  const showResult = async(e) =>{
    e.preventDefault()
    const res = await fetch('/api/contact/searchFriend',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          bodySearch: inputedFriend.pseudo,
          pseudo: currentUser?.pseudo
      }),
    })
    
    const data = await res.json()
    if(res.ok){
      setDatas(data)
      errormessage.current.classList.remove('active')
      if(cardUser.current){
        cardUser.current.classList.remove('active')
      }
    }else{
      errormessage.current.classList.add('active')
      setError(data)
    }
  }
  return (
    <AddContactStyle className='container'>
        <h1>Recherche relation</h1>

        <p className='error' ref={errormessage}>{error}</p>
        <form onSubmit={showResult}>
          <input type='text' value={inputedFriend.pseudo || ""} name='addContact' placeholder='Entrer l’identifiant (abcd#1234)' onChange={(e) => setInputedFriend({ ...inputedFriend, pseudo:e.target.value })}/>
        </form>
        {datas.length ? (
          <div className='findResult'>
            {datas.map((elt, i) => (
              <div key={i} ref={cardUser} className='cardUser'>
                <p className='sendRequestLabel'>Demande d&apos;ami envoyé</p>
                {elt.avatar ? (
                    <Image
                        src={elt?.avatar}
                        alt={elt?.pseudo}
                        width={110}
                        height={110}
                        objectFit='cover'
                    />
                ) : (
                    <Image
                        src={'/logo.webp'}
                        alt={'photo de profil'}
                        width={110}
                        height={110}
                        objectFit='cover'
                    />
                )} 
                <p>{elt.pseudo}</p>  

                <button className='btnPrimary' onClick={() => handleAddUser(elt.pseudo)}>Ajouter la relation</button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p>Aucun résultat</p>
          </>
        )}
        {friendRequest.map((elt,i) => (
            <div key={i} className='myRelationContainer'>
              <h2>Relations actuelles </h2>
              <div className='myRelation'>
                {elt.relation &&
                
                <>
                {elt.relation.map((element, index) => (
                  
                  <div key={index} className='cardUser'>

                      {element.grandparent?.avatar || element.grandChildren?.avatar ? (
                        <Image
                            src={element.grandparent?.avatar || element.grandChildren?.avatar}
                            alt={element.grandparent?.pseudo || element.grandChildren?.pseudo}
                            width={110}
                            height={110}
                            objectFit='cover'
                        />
                    ) : (
                        <Image
                            src={'/logo.webp'}
                            alt={'photo de profil'}
                            width={110}
                            height={110}
                            objectFit='cover'
                        />
                    )} 
                    <p>{element.grandparent?.pseudo || element.grandChildren?.pseudo}</p>  
                  </div>
                ))}
                </>
                }
              </div>
            </div>
          ))}
    </AddContactStyle>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  try {
        const cookie = parseCookies(req)
        if (res) {
        if(cookie.user){
          const parsedUser =  JSON.parse(cookie.user)
          const prisma = new PrismaClient()
          if(parsedUser.role == 'grandchildren'){
            const friendRequest = await prisma.grandchildren.findMany({
              where:{
                pseudo: parsedUser.pseudo
              },
              select:{
                relation:{
                  select:{
                      grandparent:{
                        select:{
                          pseudo:true,
                          avatar:true,
                        }
                    }
                  }
                }
              }
            })
            await prisma.$disconnect()
            return{
              props:{
                friendRequest,
                user: parsedUser && parsedUser,
              }
            }
          }

          if(parsedUser.role == 'grandparent'){
            const friendRequest = await prisma.grandparent.findMany({
              where:{
                pseudo: parsedUser.pseudo
              },
              select:{
                relation:{
                  select:{
                      grandChildren:{
                        select:{
                          pseudo:true,
                          avatar:true,
                        }
                    }
                  }
                }
              }
            })
            await prisma.$disconnect()
            return{
              props:{
                friendRequest,
                user: parsedUser && parsedUser,
              }
            }
          }
        }
      }
  }catch(e){
    console.log(e)
    return{
      redirect:{
        destination:'/experience/login',
        permanent:false
      }
    }
  }
}  
