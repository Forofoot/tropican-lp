import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { parseCookies } from "../../helpers/"
import { useCookies } from "react-cookie"
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const DashboardStyle = styled.section`
    height: 100vh;
    h3{
      margin-top: 45px;
    }
    a{
      color:#000;
    }
`

const Dashboard = ({user, friendRequest}) => {
    const [cookies] = useCookies(["user"])
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        setCurrentUser(cookies.user)
    }, [cookies.user])

    const handleCreateRelation = async( relationId ) =>{
      const res = await fetch('/api/notification/accept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentUserID: currentUser?.id,
            relationID: relationId,
            sender: currentUser?.role
        }),
    });
    }

    const handleDeleteRelation = async( relationId) => {
      console.log(relationId)
      const res = await fetch('/api/notification/reject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUserID: currentUser?.id,
          relationID: relationId,
          sender: currentUser?.role
        }),
    });
    }


    return (
        <DashboardStyle>
            <h1>Expérience de {currentUser?.firstName}</h1>

            <Link href="/experience/quizz"><a>Commencer le quizz</a></Link> 
            {friendRequest ? (
            <h3>Demande d&apos;amis de : {friendRequest.map((elt, i) =>(
                  <div key={i}>
                    {elt.sender !== currentUser?.role && 
                      <>
                        <p>{elt.grandparent?.pseudo}</p>
                        <p>{elt.grandChildren?.pseudo}</p>
                        <button onClick={() => handleCreateRelation(elt.grandParent_id || elt.grandChildren_id)}>Accepter</button>
                        <button onClick={() => handleDeleteRelation(elt.grandParent_id || elt.grandChildren_id)}>Refuser</button>
                      </>
                    }
                  </div>
            ))} </h3>
            ) : (
              <p>Aucune notification</p>
            ) }
        </DashboardStyle>
    );
}

export default Dashboard;


export const getServerSideProps = async ({ req, res }) => {
  try {
        const cookie = parseCookies(req)
        if (res) {
        if(cookie.user){
          const parsedUser =  JSON.parse(cookie.user)
          const prisma = new PrismaClient()
          if(parsedUser.role == 'grandchildren'){
            const friendRequest = await prisma.notification.findMany({
              where:{
                grandChildren_id: parsedUser.id
              },
              select:{
                grandParent_id:true,
                grandparent:{
                  select:{
                    pseudo:true
                  }
                },
                sender:true
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
            const friendRequest = await prisma.notification.findMany({
              where:{
                grandParent_id: parsedUser.id
              },
              select:{
                grandChildren_id:true,
                grandChildren:{
                  select:{
                    pseudo:true
                  }
                },
                sender:true
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