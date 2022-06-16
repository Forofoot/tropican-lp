import styled from "styled-components"
import Image from "next/image"

const FooterStyle = styled.footer`
    backgrond:red;
`

export default function Footer() {
  return (
    <FooterStyle>
        <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        >
        Powered by{' '}
        <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
        </a>
  </FooterStyle>
  )
}
