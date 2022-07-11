import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { Cookies, useCookies } from "react-cookie"
import { useRouter } from 'next/router'
import Image from 'next/image'

const AuthStyle = styled.section`
    width: 100%;
    max-width: 800px;
    margin: auto;
    h1{
        font-family: 'Mark Pro';
        font-style: normal;
        font-weight: 700;
        line-height: 70px;
        margin-bottom: 10px;
        font-size: 3.5rem;
        @media(max-width: 768px){
            display: none;
        }
    }
    h2{
        font-family: 'Sofia Pro';
        font-style: normal;
        font-weight: 400;
        font-size: 1.375rem;
        margin-bottom: 50px;
        @media(max-width: 768px){
            display: none;
        }
    }
    .loginLogo{
        display:flex;
        justify-content: center;
        margin-bottom: 50px;
        @media(min-width: 768px){
            display: none;
        }
    }
    .loginPhoto{
        display: none;
        @media(min-width: 768px){
            display: flex;
            align-items: center;
            padding:20px ;
        }
    }
    .container__login{
        @media(min-width: 768px){
            display:flex;
            &--form{
                width: 100%
            }
        }
    }
    
    .loginChoiceBlock{
        display:flex;
        @media(min-width: 768px){
        }
        .loginChoice {
            width: 50%;
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #212F89;
            color : #212F89;
            margin-bottom: 40px;
            font-weight: 700;
            font-size: 1.1rem;
            &.active{
                border-bottom: 3px solid #212F89;
            }
        }
    }
    
    .buttonBlock{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        margin-bottom: 30px;
        flex-wrap: wrap;
        .choice__highlight{
            padding:0 20px;
            width: 100%;
            p{
                font-weight: 700;
                color: #212F89;
            }
        }
        .loginButton{
            padding: 8px 70px 8px 10px;
            border-radius: 10px;
            border: 1px solid #212F89;
            text-align: center;
            &.active{
                border: 2px solid #212F89;
                background-color: #2299dd36;
            }
        }
    }
    form{
        padding: 0 25px;
        label, input{
            all: unset;
            margin-bottom: 20px;
            display: flex;
        }
        label{
            color: #212F89;
            font-weight: 700;
        }
        input{
            width: 100%;
            padding: 8px 5px;
            border: .5px solid black;
            border-radius: 10px;
            &:focus{
                border-bottom: 2px solid #212F89;
                }
            }
        
        p{
            text-align: center;
            margin: 0 0 75px 0;
            a{
                color: #212F89;
            }
            
        }
        button{
            all: unset;
            padding: 15px 45px;
            background: #212F89;
            border-radius: 25px;
            color: #F4F4F4;
            font-family: 'Sofia Pro';
            font-style: normal;
            font-weight: 700;
            display: block;
            margin: auto;
            margin-bottom: 20px;
        }
        @media(min-width: 768px){
            width: 100%;
        }
    }
    
`
export default function Index() {

  const router = useRouter()

  const [loginChoice, setLoginChoice] = useState('signin')
  const [type, setType] = useState(null)
  const [error, setError] = useState()
 const [cookies, setCookie] = useCookies(["user"])

 const [currentUser, setCurrentUser] = useState(null)

 useEffect(() => {
    if(cookies.user){
        router.push('/experience/dashboard')
    }
 });

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

  
  const errormessage = useRef()

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
    if(res.ok){
        setCookie("user", JSON.stringify(data), {
            path: '/',
            maxAge: 3600, // Expires after 1hr
            sameSite: true,
        })
        router.reload('/experience/dashboard')
    }else{
        errormessage.current.classList.add('active')
        setError(data)
    }
  }

  return (
    <AuthStyle>
        <p className='error' ref={errormessage}>{error}</p>
        <div className='loginLogo'>
            <Image
                src={"/logo.webp"}
                alt="logo Leste"
                width={165}
                height={130}
                priority
            />
        </div>
        <div className='container__login' >
            <div className='loginPhoto'>
                <Image
                    src={'/profil/photo_login.webp'}
                    alt="photo d'un lac pour illustrer la page de connexion ou de création de compte"
                    width={540}
                    height={768}
                
                />
            </div>
            <div className='container__login--form'>

            
            <div className='loginChoiceBlock'>
                <div className={`loginChoice ${loginChoice == 'signin' ? 'active' : ''}`} onClick={() => setLoginChoice('signin')}>
                    Se connecter
                </div>
                <div className={`loginChoice ${loginChoice == 'signup' ? 'active' : ''}`} onClick={() => setLoginChoice('signup')}>
                    S&apos;inscrire
                </div>
            </div>
                <h1>Bienvenue</h1>

                { loginChoice == 'signup' ? (
                    <>
                    <div className='buttonBlock'>
                        <h2>Inscrivez-vous afin de découvrir<br></br>de nouvelles expériences !</h2>
                        <div className='choice__highlight'>
                            <p>Utilisateur</p>
                        </div>
                    
                        <div className={`loginButton ${type == 'grandChildren' ? 'active' : ''}`} onClick={() => setType('grandChildren')}>Petit-enfant
                        </div>
                        
                        <div className={`loginButton ${type == 'grandParent' ? 'active' : ''}`} onClick={() => setType('grandParent')}>Grand-parent
                        </div>

                    </div>
                    { type == 'grandChildren' &&
                        <form method='POST' onSubmit={handleCreateGrandChildren}>
                        <label>Email</label>
                        <input type="text" value={inputedGrandChildren.email || ""} placeholder='email' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, email:e.target.value })}/>
                        <label>Prénom</label>
                        <input type="text" value={inputedGrandChildren.firstName || ""} placeholder='Prénom' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, firstName:e.target.value })}/>
                        <label>Nom</label>
                        <input type="text" value={inputedGrandChildren.lastName || ""} placeholder='Nom' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, lastName:e.target.value })}/>
                        <label>Pseudo</label>
                        <input type="text" value={inputedGrandChildren.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, pseudo:e.target.value })}/>
                        <label>Mot de passe</label>
                        <input type="text"  value={inputedGrandChildren.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedGrandChildren({ ...inputedGrandChildren, password:e.target.value })}/>
                        <button type='submit'>S&apos;inscrire</button>
                    </form>
                    }

                    { type == 'grandParent' &&
                        <form className='form__signup' method='POST' onSubmit={handleCreateGrandParent}>
                            <label>Email</label>
                            <input type="text" value={inputedGrandParent.email || ""} placeholder='email' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, email:e.target.value })}/>
                            <label>Prénom</label>
                            <input type="text" value={inputedGrandParent.firstName || ""} placeholder='Prénom' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, firstName:e.target.value })}/>
                            <label>Nom</label>
                            <input type="text" value={inputedGrandParent.lastName || ""} placeholder='Nom' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, lastName:e.target.value })}/>
                            <label>Pseudo</label>
                            <input type="text" value={inputedGrandParent.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, pseudo:e.target.value })}/>
                            <label>Mot de passe</label>
                            <input type="text"  value={inputedGrandParent.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedGrandParent({ ...inputedGrandParent, password:e.target.value })}/>
                            <button type='submit'>S&apos;inscrire</button>
                        </form>
                    }
                    </>
                ) : (  
                    <>
                    <h2>Connectez-vous afin de découvrir<br></br>de nouvelles expériences !</h2>
                                    
                    <form method='POST' onSubmit={handleSignin}>
                        <label>Nom d&apos;utilisateur</label>
                        <input type="text" value={inputedUser.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, pseudo:e.target.value })}/>
                        <label>Mot de passe</label>
                        <input type="text"  value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                        <button type='submit'>Se connecter</button>
                        <p>
                            <a> Mot de passe oublié ?</a>
                        </p>
                    </form>
                    </>
                    )
                }
            </div>
        </div>
    </AuthStyle>
  )
}
