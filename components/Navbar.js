import Link from 'next/link'
import styled from 'styled-components'

const HeaderStyle = styled.header`
    background:red;
`

export default function Navbar() {

    
  return (
    <HeaderStyle>
        <Link href="/">
            <h1>Gros header</h1>
        </Link>
    </HeaderStyle>
  )
}