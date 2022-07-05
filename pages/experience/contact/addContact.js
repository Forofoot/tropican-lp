import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'

const AddContactStyle = styled.section`
    text-align: center;
    max-width: 600px;
    margin: auto;
    min-height: 100vh;
    form{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
`

export default function AddContact() {
  const [cookies] = useCookies(['user'])
  const [currentUser, setCurrentUser] = useState(null)

  const [inputedFriend, setInputedFriend] = useState({
    pseudo: "",
  })


  useEffect(() => {
    setCurrentUser(cookies.user)
  }, [cookies.user]);

  const handleAddUser = async(e) => {
    e.preventDefault()

    const res = await fetch('/api/contact/addFriend', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          currentUser: currentUser.pseudo,
          pseudo: inputedFriend.pseudo,
          role: currentUser.role,
          currentUserId: currentUser.id
      }),
  });
  }
  return (
    <AddContactStyle>
        <h1>{currentUser?.pseudo}</h1>
        <form onSubmit={handleAddUser}>
          <label htmlFor='addContact'>Ajouter un contact</label>
          <input type='text' value={inputedFriend.pseudo || ""} name='addContact' placeholder='Pseudo' onChange={(e) => setInputedFriend({ ...inputedFriend, pseudo:e.target.value })}/>
          <button type='submit'>Ajouter</button>
        </form>
    </AddContactStyle>
  )
}
