import styled from 'styled-components'
import Image from 'next/image';

const VideoStyle = styled.section`
    h2{
        margin-bottom: 36px ;
        @media (min-width: 768px){
            text-align: center;
        }
    }
    .video{
        width: 100%;
        max-width: 800px;
        height: 40vh;
        border: 1px solid;
        margin: 0 auto;
        border-radius: 20px ;
        background-color: #313131;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
const Video = () => {
    return ( 
        <VideoStyle>
            <h2 className="titleStyled"><span>Découvrez cette</span> <span>fabuleuse expérience !</span></h2>
            <div className='containerVideo'>
                <div className='video'>
                    <Image 
                        src={"/video/play.webp"}
                        alt="Player video"
                        height={85}
                        width={85}
                        layout="raw"
                    />
                </div>
            </div>
        </VideoStyle>
    );
}

export default Video;