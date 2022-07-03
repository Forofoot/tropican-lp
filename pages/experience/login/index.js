import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'

const AuthStyle = styled.section`
    width: 100%;
    max-width: 800px;
    height: 100vh;
    margin: auto;
    h1{
        text-align: center;
        margin-bottom: 50px;
    }
    .buttonBlock{
        display: flex;
        justify-content: center;
        gap: 30px;
        .loginButton{
            background-color: grey;
            padding: 30px;
            width: 320px;
            text-align: center;
        }
    }
    
`
export default function Index() {

  const router = useRouter()

  const [loginChoice, setLoginChoice] = useState('signin')
  const [type, setType] = useState(null)
 
 const [cookie, setCookie] = useCookies(["test"])
 const [inputedUser, setInputedUser] = useState({
    pseudo: "",
    password: ""
  })

  const [inputedGrandParent, setInputedGrandParent] = useState({
    email: "",
    firstName: "",
    lastName: "",
    pseudo: "",
    password: "",
  })

  const [inputedGrandChildren, setInputedGrandChildren] = useState({
    email: "",
    firstName: "",
    lastName: "",
    pseudo: "",
    password: "",
  })

  const handleCreateGrandParent = async (e) => {
    e.preventDefault();
    if (!inputedGrandParent.email || !inputedGrandParent.email.includes('@') || !inputedGrandParent.password || !inputedGrandParent.firstName || !inputedGrandParent.lastName || !inputedGrandParent.pseudo) {
        alert('Invalid details');
        return;
    }
    //POST form values
    const res = await fetch('/api/auth/signup/grandParent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: inputedGrandParent.email,
            firstName: inputedGrandParent.firstName,
            lastName: inputedGrandParent.lastName,
            pseudo: inputedGrandParent.pseudo,
            password: inputedGrandParent.password,
        }),
    });
  };

  const handleCreateGrandChildren = async (e) => {
    e.preventDefault();
    if (!inputedGrandChildren.email || !inputedGrandChildren.email.includes('@') || !inputedGrandChildren.password || !inputedGrandChildren.firstName || !inputedGrandChildren.lastName  || !inputedGrandChildren.pseudo ) {
        alert('Invalid details');
        return;
    }
    //POST form values
    const res = await fetch('/api/auth/signup/grandChildren', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: inputedGrandChildren.email,
            firstName: inputedGrandChildren.firstName,
            lastName: inputedGrandChildren.lastName,
            pseudo: inputedGrandChildren.pseudo,
            password: inputedGrandChildren.password,
        }),
    });
  };

  const handleSignin = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/signin/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pseudo: inputedUser.pseudo,
            password: inputedUser.password
        }),
    });
    
    const data = await res.json();
    if(data){
        setCookie("user", JSON.stringify(data), {
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
        })

        router.push('/experience/dashboard')
    }
  }
  return (
    <AuthStyle>
        <h1>Vous êtes ?</h1>
        <div className='loginChoiceBlock'>
            <div className='loginChoice' onClick={() => setLoginChoice('signin')}>
                Se connecter
            </div>
            <div className='loginChoice' onClick={() => setLoginChoice('signup')}>
                S&apos;inscrire
            </div>
        </div>
        { loginChoice == 'signup' ? (
            <>
            <div className='buttonBlock'>
                <div className='loginButton' onClick={() => setType('grandChildren')}>
                    Petit-enfant
                </div>
                <div className='loginButton' onClick={() => setType('grandParent')}>
                    Grand-parent
                </div>
            </div>
            { type == 'grandChildren' &&
                <form method='POST' onSubmit={handleCreateGrandChildren}>
                <input type="text" value={inputedGrandChildren.email || ""} placeholder='email' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, email:e.target.value })}/>
                <input type="text" value={inputedGrandChildren.firstName || ""} placeholder='Prénom' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, firstName:e.target.value })}/>
                <input type="text" value={inputedGrandChildren.lastName || ""} placeholder='Nom' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, lastName:e.target.value })}/>
                <input type="text" value={inputedGrandChildren.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, pseudo:e.target.value })}/>
                <input type="text"  value={inputedGrandChildren.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, password:e.target.value })}/>
                <button type='submit'>Submit</button>
            </form>
            }

            { type == 'grandParent' &&
                <form method='POST' onSubmit={handleCreateGrandParent}>
                    <input type="text" value={inputedGrandParent.email || ""} placeholder='email' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, email:e.target.value })}/>
                    <input type="text" value={inputedGrandParent.firstName || ""} placeholder='Prénom' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, firstName:e.target.value })}/>
                    <input type="text" value={inputedGrandParent.lastName || ""} placeholder='Nom' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, lastName:e.target.value })}/>
                    <input type="text" value={inputedGrandParent.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, pseudo:e.target.value })}/>
                    <input type="text"  value={inputedGrandParent.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, password:e.target.value })}/>
                    <button type='submit'>Submit</button>
                </form>
            }
            </>
        ) : (
            <form method='POST' onSubmit={handleSignin}>
                <input type="text" value={inputedUser.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, pseudo:e.target.value })}/>
                <input type="text"  value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                <button type='submit'>Submit</button>
            </form>
        )
        }
    </AuthStyle>
  )
}
