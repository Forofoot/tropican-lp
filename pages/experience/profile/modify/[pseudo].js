import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router';
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import { useCookies } from "react-cookie";
import toast, { Toaster } from 'react-hot-toast';

const ModifyStyle = styled.section`
    min-height: 95vh;
    h1{
        text-align: center;
        margin-bottom: 40px;
    }
    form{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: auto;
        background-color: none;
        padding:0;
        @media (min-width: 768px) {
            background-color: rgba(131,215,220, 0.4);
            padding: 30px 70px;
        }
        border-radius:20px;
        max-width: 700px;
        label{
            width: 100%;
            color: #212F89;
            font-weight: bold;
            font-size: 1rem;
            @media (min-width: 768px) {
                width: 30%;
            }
        }
        .input{
            display: flex;
            gap: 10px;
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 25px;
            @media (min-width: 768px) {
                flex-direction: row;
                gap: 25px;
                align-items: center;
            }
        }
        input{
            all:unset;
            width: 100%;
            border-radius: 10px;
            padding: 10px;
            font-size: 1rem;
            background-color: #fefefe;
            border: 1px solid #212F89;
            color: #212F89;
            @media (min-width: 768px) {
                width: 70%;
            }
        }
        #file-input{
            background: none;
            border: none;
            cursor: pointer;
        }
        #file-input::-webkit-file-upload-button {
            visibility: hidden;
            user-select: none;
        }
        .btnPrimary{
            margin: auto;
        }
    }

`

export default function Modify({profile}) {
    
  const [imageUploaded, setImageUploaded] = useState();

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  
  const router = useRouter()

  const [inputedUser, setInputedUser] = useState({
    email: profile.email,
    pseudo: profile.pseudo,
    phone: profile.phone,
    city: profile.city,
    password: "",
    })

  const handleChange = (event) => {
    setImageUploaded(event.target.files[0]);
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (!inputedUser.email.includes('@') ) {
        toast.error('Veuillez inclure un @')
    }

    try {
        toast.loading('Chargement en cours ...')
        const formData = new FormData();
        formData.append("image", imageUploaded);
        formData.append("userId", profile.id)
        formData.append("currentAvatar", profile.avatar_publicId)
        formData.append("currentPseudo", profile.pseudo)

        formData.append("pseudo", inputedUser.pseudo)
        formData.append("email", inputedUser.email)
        formData.append("phone", inputedUser.phone)
        formData.append("city", inputedUser.city)
        formData.append("password", inputedUser.password)

        const res = await fetch("/api/profile/modify", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if(res.ok){
            toast.remove()
            toast.success('Profile modifié')
            setCookie("user", JSON.stringify(data), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })

            router.push(`/experience/profile/${data.pseudo}`)
        }else{
            toast.remove()
            toast.error('Sauvegarde impossible')
        }
        
  
    //router.push('/')
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    if(!cookies.user){
        router.push('/experience/login')
    }
  },)

  return (
    <ModifyStyle className='container'>
        <Toaster/>
        <h1>Modifier le profil</h1>

        <form onSubmit={submitData}>
            <div className='input'>
                <label htmlFor='avatar'>Avatar</label>
                <input
                    onChange={handleChange}
                    accept=".jpg, .png, .gif, .jpeg"
                    type="file"
                    id='file-input'
                    name="avatar"
                ></input>
            </div>

            <div className='input'>
                <label htmlFor='pseudo'>Nom d&apos;utilisateur</label>
                <input type='text' name="pseudo" value={inputedUser.pseudo || ''} placeholder="nom d'utilisateur" onChange={(e) => setInputedUser({ ...inputedUser, pseudo:e.target.value })}/>
            </div>

            <div className='input'>
                <label htmlFor='mobile'>Téléphone mobile</label>
                <input type='tel' pattern='[0-9]{10}' name="mobile" value={inputedUser.phone || ''} placeholder="Téléphone mobile" onChange={(e) => setInputedUser({ ...inputedUser, phone:e.target.value })}/>
            </div>

            <div className='input'>
                <label htmlFor='email'>Email</label>
                <input type='text' name="email" value={inputedUser.email || ''} placeholder="email" onChange={(e) => setInputedUser({ ...inputedUser, email:e.target.value })}/>
            </div>

            <div className='input'>
                <label htmlFor='city'>Ville</label>
                <input type='text' name="city" value={inputedUser.city || ''} placeholder="Ville" onChange={(e) => setInputedUser({ ...inputedUser, city:e.target.value })}/>
            </div>

            <div className='input'>
                <label htmlFor='password'>Mot de passe</label>
                <input type='password' name="password" placeholder='Mot de passe' minLength={8} onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
            </div>
            
            <button className='btnPrimary' type='submit'>Valider</button>
        </form>
    </ModifyStyle>
  )
}

export const getServerSideProps = async ({query}) => {
    
    const currentPseudo = query.pseudo

    try{
        const prisma = new PrismaClient();
        const findWhereGrandParent = await prisma.grandparent.findUnique({
            where:{
                pseudo: currentPseudo
            }
        })
        if(findWhereGrandParent){
            const profile = await prisma.grandparent.findUnique({
            where:{
                pseudo:currentPseudo
            },
            select:{
                    id:true,
                    pseudo:true,
                    avatar:true,
                    avatar_publicId:true,
                    email:true,
                    city:true,
                    phone:true,
                }
            })
            await prisma.$disconnect()
            return{
            props:{
                    profile
                }
            }
        }
        const profile = await prisma.grandchildren.findUnique({
            where:{
                pseudo:currentPseudo
            },
            select:{
                id:true,
                pseudo:true,
                avatar:true,
                avatar_publicId:true,
                email:true,
                city:true,
                phone:true,
            }
        })
        await prisma.$disconnect()
        return{
            props:{
                profile
            }
        }
    }catch(e){
        console.log(e)
        return{
            redirect:'/experience/',
            permanent:false
        }
    }
}