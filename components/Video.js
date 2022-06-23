import styled from 'styled-components'

const VideoStyle = styled.div`
    h2{
        text-align: center;
        margin-bottom: 36px ;
    }
    .__video{
        width: 350px;
        height: 200px;
        border: 1px solid;
        margin: 0 auto;
        border-radius: 20px ;
        margin-bottom: 50px ;
    }
`
const Video = () => {
    return ( 
        <VideoStyle>
            <h2>Il n&apos;est jamais trop tard pour nouer ou renforcer vos liens </h2>
            <div className='container__video'>
                <div className='__video'>

                </div>
            </div>
        </VideoStyle>
    );
}

export default Video;