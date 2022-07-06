import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router';
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import { useCookies } from "react-cookie";

const ModifyStyle = styled.section`
    max-width: 600px;
    margin: auto;
    form{
        display: flex;
        flex-direction: column;
    }

`

export default function Modify({profile}) {
    
  const [imageUploaded, setImageUploaded] = useState();

  const [cookies,setCookie, removeCookie] = useCookies(["user"]);

  const [currentUser, setCurrentUser] = useState(null)
  
  const router = useRouter()


  const handleChange = (event) => {
    setImageUploaded(event.target.files[0]);
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (!imageUploaded) {
      return;
    }

    try {
        const formData = new FormData();
        formData.append("image", imageUploaded);
        formData.append("userId", profile?.id)
        formData.append("currentAvatar", profile?.avatar_publicId)
        formData.append("currentPseudo", profile?.pseudo)

        const res = await fetch("../../../api/profile/modify", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if(res.ok){
            setCookie("user", JSON.stringify(data), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })

            router.push(`/experience/profile/${profile.pseudo}`)
        }else{
            alert(data)
        }
        
  
    //router.push('/')
    } catch (error) {
    console.error(error);
      }
  };

  useEffect(() => {
    setCurrentUser(cookies.user)
    if(!cookies.user){
        router.push('/experience/login')
    }
  }, [cookies.user])

  return (
    <ModifyStyle>
        <form onSubmit={submitData}>
            <label htmlFor='avatar'>Avatar</label>
            <input
                onChange={handleChange}
                accept=".jpg, .png, .gif, .jpeg"
                type="file"
                name="avatar"
            ></input>
            <label htmlFor='pseudo'>Pseudo</label>
            <input type='text' name="pseudo" value={profile?.pseudo}/>
            <label htmlFor='firstname'>Prénom</label>
            <input type='text' name="firstname" value={profile?.firstName}/>
            <label htmlFor='name'>Nom</label>
            <input type='text' name="name" value={profile?.lastName}/>
            <label htmlFor='email'>Email</label>
            <input type='text' name="email" value={profile?.email}/>
            <label htmlFor='password'>Mot de passe</label>
            <input type='password' name="pseudo" value={''}/>
            <button type='submit'>Modifier</button>
        </form>
    </ModifyStyle>
  )
}

export const getServerSideProps = async ({query}) => {
    // Fetch data from external API
    //const cookie = parseCookies(req)
    const prisma = new PrismaClient();
    const currentPseudo = query.pseudo

    const findWhereGrandParent = await prisma.grandparent.findFirst({
        where:{
            pseudo: currentPseudo
        }
    })
    if(findWhereGrandParent){
        const profile = await prisma.grandparent.findFirst({
        where:{
            pseudo:currentPseudo
        },
        select:{
            id:true,
            firstName:true,
            lastName: true,
            pseudo:true,
            avatar:true,
            avatar_publicId:true,
            email:true,
            experience:{
                select:{
                    name:true,
                    place:true,
                    grandChildren:{
                        select:{
                            firstName:true
                        }
                    },
                    image:{
                        select:{
                            image: true
                        }
                    }
                }
            }
        }
        })
        await prisma.$disconnect()
        return{
        props:{
                profile
            }
        }
    }
    const profile = await prisma.grandchildren.findFirst({
        where:{
            pseudo:currentPseudo
        },
        select:{
            id:true,
            firstName:true,
            lastName: true,
            pseudo:true,
            avatar:true,
            avatar_publicId:true,
            email:true,
            experience:{
                select:{
                    name:true,
                    place:true,
                    grandParent:{
                        select:{
                            firstName:true
                        }
                    },
                    image:{
                        select:{
                            image: true
                        }
                    }
                }
            }
        }
    })
    await prisma.$disconnect()
    return{
        props:{
            profile
        }
    }
}