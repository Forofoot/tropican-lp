import React, {useState, useCallback, useRef} from 'react'
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const ProfileStyle = styled.section`
    text-align: center;
    padding-top: 50px;
    height: 100vh;
    figure{
        margin-bottom: 15px;
    }
    p{
        color: #fff;
        font-size: 50px;
    }
    .actions{
        display: flex;
        justify-content: center;
        gap: 15px;
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
                        <p onClick={() => setSelectedLocation(result)}>
                            {result.name}
                        </p>
                    </Marker>

                    {result.long === selectedLocation.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={false}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            {result.name}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}

        </ReactMapGL>
    </ProfileStyle>
  )
}

export const getServerSideProps = async ({query}) => {
    // Fetch data from external API
    //const cookie = parseCookies(req)
    const prisma = new PrismaClient();
    const currentPseudo = query.pseudo

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
            firstName:true,
            lastName: true,
            pseudo:true,
            avatar:true,
            experience:{
                select:{
                    name:true,
                    long:true,
                    lat:true,
                    image:{
                        select:{
                            image: true
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
            firstName:true,
            lastName: true,
            pseudo:true,
            avatar:true,
            experience:{
                select:{
                    name:true,
                    long:true,
                    lat:true,
                    image:{
                        select:{
                            image: true
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