import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { parseCookies } from "../../helpers/"
import { useCookies } from "react-cookie"
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Head from 'next/head';

const DashboardStyle = styled.section`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 45px;
    a{
      color:#000;
    }
`

const Dashboard = ({grandChildren, grandParent}) => {
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
          <h2>Nombre de grands parents sur le site : {grandParent}</h2>
          <h2>Nombre de petits enfants sur le site : {grandChildren}</h2>
            
        </DashboardStyle>
    </>);
}

export default Dashboard;


export const getServerSideProps = async ({ req, res }) => {
  
  const prisma = new PrismaClient()
  try {
      const grandChildren = await prisma.grandchildren.count()
      const grandParent = await prisma.grandparent.count()

      await prisma.$disconnect()
      console.log(grandChildren)
      console.log(grandParent)
      return{
        props:{
          grandChildren,
          grandParent
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