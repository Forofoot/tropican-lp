import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

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
  const [loginChoice, setLoginChoice] = useState(null)
  
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

  return (
    <AuthStyle>
        <h1>Vous êtes ?</h1>
        <div className='buttonBlock'>
            <div className='loginButton' onClick={() => setLoginChoice('grandChildren')}>
                Petit-enfant
            </div>
            <div className='loginButton' onClick={() => setLoginChoice('grandParent')}>
                Grand-parent
            </div>
        </div>
        
        { loginChoice == 'grandChildren' &&
            <form method='POST' onSubmit={handleCreateGrandChildren}>
            <input type="text" value={inputedGrandChildren.email || ""} placeholder='email' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, email:e.target.value })}/>
            <input type="text" value={inputedGrandChildren.firstName || ""} placeholder='Prénom' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, firstName:e.target.value })}/>
            <input type="text" value={inputedGrandChildren.lastName || ""} placeholder='Nom' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, lastName:e.target.value })}/>
            <input type="text" value={inputedGrandChildren.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, pseudo:e.target.value })}/>
            <input type="text"  value={inputedGrandChildren.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, password:e.target.value })}/>
            <button type='submit'>Submit</button>
        </form>
        }

        { loginChoice == 'grandParent' &&
            <form method='POST' onSubmit={handleCreateGrandParent}>
                <input type="text" value={inputedGrandParent.email || ""} placeholder='email' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, email:e.target.value })}/>
                <input type="text" value={inputedGrandParent.firstName || ""} placeholder='Prénom' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, firstName:e.target.value })}/>
                <input type="text" value={inputedGrandParent.lastName || ""} placeholder='Nom' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, lastName:e.target.value })}/>
                <input type="text" value={inputedGrandParent.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, pseudo:e.target.value })}/>
                <input type="text"  value={inputedGrandParent.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, password:e.target.value })}/>
                <button type='submit'>Submit</button>
            </form>
        }
    </AuthStyle>
  )
}
