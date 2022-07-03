import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { parseCookies } from "../../helpers/"
import { useCookies } from "react-cookie"

const DashboardStyle = styled.section`
    height: 100vh;
`

const Dashboard = ({user}) => {
    const [cookies] = useCookies(["user"])
    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        setCurrentUser(cookies.user)
        if(!cookies.user){
          Router.push('/experience/login')
        }
    }, [cookies.user])


    return (
        <DashboardStyle>
            Expérience de {currentUser?.firstName}
        </DashboardStyle>
    );
}

export default Dashboard;


/*export const getServerSideProps = async ({ req, res }) => {
    const cookie = parseCookies(req)
  
    if (res) {
      if (Object.keys(cookie).length === 0 && cookie.constructor === Object) {
        res.writeHead(301, { Location: "/" })
        res.end()
      }
      if(cookie.user){
        const parsedUser =  JSON.parse(cookie.user)
        console.log('user id'+ parsedUser.id)

        return{
          props:{
            user: parsedUser && parsedUser,
          }
        }
      }
    }
}*/