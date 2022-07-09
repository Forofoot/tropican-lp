import React, {useState} from 'react'
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/dist/client/image';
import moment from 'moment'
import Link from 'next/dist/client/link';

const ProfileStyle = styled.section`
    text-align: center;
    height: 100vh;
    margin-bottom: 0;
    figure{
        margin-bottom: 15px;
    }
    .mapboxgl-map{
        font-family: 'SofiaPRO', sans-serif;
    }
    .blockExperience{
        display: flex;
        width: 280px;
        height: 100px;
        background: #212F89;
        position: relative;
        border-radius: 10px;
        margin-left: 50%;
        margin-bottom: 50%;
        &.incoming{
            background-color: #313131;
            .imgExperience{
                border-color: #313131;
                background-color: #313131;
            }
            &::before{
                border-top-color: #313131;
            }
        }
        &::before{
            content: '';
            position: absolute;
            left: -1px;
            bottom: -20px;
            height : 0;
            width : 0;
            border-top : 30px solid #212F89;
            border-right : 22px solid transparent;
            border-left : 22px solid transparent;
        }
        .imgExperience{
            border-radius: 50%;
            border: 8px solid #212F89;
            position: absolute;
            top: -6px;
            left: -35px;
            width: 110px;
            height: 110px;
            background-color:#212F89;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .detailExperience{
            color: #F4F4F4;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 5px 0 5px 100px;
            justify-content: space-between;
            h2{
                color: #F4F4F4;
            }
            p{
                font-size: 1rem;
        }
    }
    .actions{
        display: flex;
        justify-content: center;
        gap: 15px;
    }
}
`

export default function Map({profile, country}) {
    
    const [selectedLocation, setSelectedLocation] = useState({})
    const [viewState, setViewState] = useState({
        longitude: profile.experience[0].long,
        latitude:profile.experience[0].lat,
        zoom: 3.5
    });
  return (
    <ProfileStyle>
        <ReactMapGL
        mapStyle="mapbox://styles/forofoot/cl4y8ihq0005p15ob6thacpx7"
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        >
            <GeolocateControl
                positionOptions={{ enableHighAccuracy: true }}
                trackUserLocation={true}
            />
            {profile.experience.map((result, i) => (
                <div key={i}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <div className={`blockExperience ${moment(result.end) < new Date() ? ('past') : ('incoming')}`} onClick={() => setSelectedLocation(result)}>
                            <div className='imgExperience'>
                                
                            {moment(result.end) < new Date(
                                ) ? (
                                    <Image
                                        src={'https://res.cloudinary.com/leste/image/upload/v1656890119/gallery/Rectangle_309_4_wempah.png'}
                                        alt={`${result.name} cover`}
                                        width={110}
                                        height={110}
                                        layout='raw'
                                    />
                                ) : (
                                    <Image
                                        src={'/map/calendar_map.webp'}
                                        alt='calendrier'
                                        width={60}
                                        height={60}
                                        layout='raw'
                                    />
                                )}
                            </div>
                            <div className='detailExperience'>
                                <h2>{result.place}</h2>
                                <p>avec {result.grandChildren?.firstName || result.grandParent?.firstName}</p>
                                {moment(result.end) < new Date(
                                ) ? (
                                    <Link href={"#"}>
                                        <a>
                                            Voir l&apos;album
                                        </a>
                                    </Link>
                                ) : (
                                    <p>À venir</p>
                                )}
                                <p></p>
                            </div>
                        </div>
                    </Marker>
                </div>
            ))}

        </ReactMapGL>
    </ProfileStyle>
  )
}

export const getServerSideProps = async ({query}) => {

    const currentPseudo = query.pseudo
    try{
    const prisma = new PrismaClient();
    const findWhereGrandParent = await prisma.grandparent.findUnique({
        where:{
            pseudo: currentPseudo
        }
    })
    if(findWhereGrandParent){
        const profile = await prisma.grandparent.findUnique({
        where:{
            pseudo:currentPseudo
        },
        select:{
            experience:{
                select:{
                    name:true,
                    long:true,
                    lat:true,
                    end:true,
                    place:true,
                    image:{
                        select:{
                            image: true
                        }
                    },
                    grandChildren:{
                        select:{
                            firstName:true
                        }
                    }
                }
            }
        }
        })
        await prisma.$disconnect()
        return{
        props:{
                profile
            }
        }
    }
    const profile = await prisma.grandchildren.findUnique({
        where:{
            pseudo:currentPseudo
        },
        select:{
            experience:{
                select:{
                    name:true,
                    long:true,
                    lat:true,
                    end:true,
                    place:true,
                    image:{
                        select:{
                            image: true
                        }
                    },
                    grandParent:{
                        select:{
                            firstName:true
                        }
                    }
                }
            }
        }
        })
        
        await prisma.$disconnect()
        return{
            props:{
                profile
            }
        }
    }catch(e){
        console.log(e)
        return{
            redirect: '/experience/dashboard',
            permanent:false
        }
    }
}