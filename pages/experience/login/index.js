import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Cookies, useCookies } from "react-cookie"
import { useRouter } from 'next/router'
import Image from 'next/image'

const AuthStyle = styled.section`
    width: 100%;
    max-width: 800px;
    margin: auto;
    .loginLogo{
        display:flex;
        justify-content: center;
        margin-bottom: 50px;
    }
    .loginChoiceBlock{
        display:flex;
        .loginChoice {
            width: 50%;
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #F20D97;
            color : #F20D97;
            margin-bottom: 40px;
            &:nth-child(1){
                border-bottom: 1px solid #212F89;
                color: #212F89;
                &.active{
                    border-bottom: 3px solid #212F89;
                }
            }
            &.active{
                border-bottom: 3px solid #F20D97;
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
            padding:0 20px ;
            width: 100% ;
        }
        .loginButton{
            width: 20px;
            height: 20px;
            border-radius: 10px;
            border: 1px solid #212F89;
            text-align: center;
            &:hover{
                border: 2px solid #212F89;
            }
            &.active{
                background-color: red;
            }
        }
    }
    form{
        padding: 0 20px;
        label, input{
            all: unset;
            margin-bottom: 30px;
            display: flex;
        }
        label{
            color: #212F89;
        }
        input{
            width: 100%;
            padding: 2px 0;
            border-bottom: 1px solid black;
            &:focus{
                border-bottom: 2px solid #212F89;
                }
            }
        
        p{
            text-align: center;
            margin: 75px 0;
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
            font-family: 'Mark Pro';
            font-style: normal;
            display: block;
            margin: auto;
            margin-bottom: 35px
        }
    }
    
`
export default function Index() {

  const router = useRouter()

  const [loginChoice, setLoginChoice] = useState('signin')
  const [type, setType] = useState(null)
 
 const [cookie, setCookie] = useCookies(["user"])

 const [currentUser, setCurrentUser] = useState(null)

 if (currentUser){
    router.push('/experience/dashboard')
 }

 useEffect(() => {
    setCurrentUser(cookie.user)
 }, [cookie.user]);

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

  const handleClick = event => {
    // 👇️ toggle class on click
    event.currentTarget.classList.toggle('bg-salmon');

    // 👇️ add class on click
    // event.currentTarget.classList.add('bg-salmon');

    // 👇️ remove class on click
    // event.currentTarget.classList.remove('bg-salmon');
  };

  
  return (
    <AuthStyle>
        <div className='loginLogo'>
            <Image
                src={"/logo.webp"}
                alt="logo Leste"
                width={165}
                height={130}
                priority
            />
        </div>
        <div className='loginChoiceBlock'>
            <div className={`loginChoice ${loginChoice == 'signin' ? 'active' : ''}`} onClick={() => setLoginChoice('signin')}>
                Se connecter
            </div>
            <div className={`loginChoice ${loginChoice == 'signup' ? 'active' : ''}`} onClick={() => setLoginChoice('signup')}>
                S&apos;inscrire
            </div>
        </div>
        { loginChoice == 'signup' ? (
            <>
            <div className='buttonBlock'>
                <div className='choice__highlight'>
                    <p>Utilisateur</p>
                </div>
            
                <div className={`loginButton ${type == 'grandChildren' ? 'active' : ''}`} onClick={() => setType('grandChildren')}>
                </div>
                <p>Petit-enfant</p>
                <div className='loginButton' onClick={() => setType('grandParent')}>
                </div>
                <p>Grand-parent</p>
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
            <form method='POST' onSubmit={handleSignin}>
                <label>Nom d&apos;utilisateur</label>
                <input type="text" value={inputedUser.pseudo || ""} placeholder='Pseudo' onChange={(e) => setInputedUser({ ...inputedUser, pseudo:e.target.value })}/>
                <label>Mot de passe</label>
                <input type="text"  value={inputedUser.password || ""} placeholder='Mot de passe' onChange={(e) => setInputedUser({ ...inputedUser, password:e.target.value })}/>
                <p>
                    <a> Mot de passe oublié ?</a>
                </p>
                <button type='submit'>Se connecter</button>
            </form>
        )
        }
    </AuthStyle>
  )
}
