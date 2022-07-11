import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { parseCookies } from "../../helpers/"
import { useCookies } from "react-cookie"
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Head from 'next/head';

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
      try{
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
      }catch(e){
        console.log(e)
      }
    }

    const handleDeleteRelation = async( relationId) => {
      try{
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
      }catch(e){
        console.log(e)
      }
    }


    return (

      <>
        <Head>
        <title>Leste - Dashboard</title>
        <meta
          name="description"
          content="Le Dashboard de la plateforme Leste"
        />
      </Head>
        <DashboardStyle>

            <Link href="/experience/quizz"><a>Commencer le quizz</a></Link> 
            
        </DashboardStyle>
    </>);
}

export default Dashboard;


export const getServerSideProps = async ({ req, res }) => {
  try {
      if (res) {
        if(cookie.user){
          const parsedUser =  JSON.parse(cookie.user)
          const prisma = new PrismaClient()
          return{
            props:{
              user: parsedUser && parsedUser,
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