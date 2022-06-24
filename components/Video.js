import styled from 'styled-components'

const VideoStyle = styled.div`
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
        margin-bottom: 150px ;
        background-color: #313131;
    }
`
const Video = () => {
    return ( 
        <VideoStyle>
            <h2>Découvrez cette fabuleuse expérience !</h2>
            <div className='containerVideo'>
                <div className='video'></div>
            </div>
        </VideoStyle>
    );
}

export default Video;