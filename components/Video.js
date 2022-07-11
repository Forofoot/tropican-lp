import styled from 'styled-components'
import React from 'react'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoStyle = styled.div`
    h2{
        margin-bottom: 36px ;
        @media (min-width: 768px){
            text-align: center;
        }
    }
    .containerVideo{
        margin-bottom:100px;
            .video{
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    }

`
export default function Video() {
    return (
        <VideoStyle>
            <>
                <h2 className="titleStyled"><span>Découvrez cette</span> <span>fabuleuse expérience !</span></h2>
                <div className='containerVideo'>
                    <div className='video'>
                        <ReactPlayer url='https://youtu.be/hyX3xYhCE5c' />
                    </div>
                </div>
            </>
        </VideoStyle>
    );
}