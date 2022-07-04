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
        longitude: -100,
        latitude: 40,
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
            {country.map((result, i) => (
                <div key={i}>
                    <Marker
                        longitude={result.longitude}
                        latitude={result.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p onClick={() => setSelectedLocation(result)}>
                            Destination
                        </p>
                    </Marker>

                    {result.longitude === selectedLocation.longitude ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={false}
                            latitude={result.latitude}
                            longitude={result.longitude}
                        >
                            {result.country}
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

    const profile = await prisma.grandchildren.findFirst({
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
                image:{
                    select:{
                        image: true
                    }
                }
            }
        }
    }
    })

    let country =  [
        {
              country : "Albania",
              alpha2 : "AL",
              alpha3 : "ALB",
              numeric : 8,
              latitude : 50.06,
              longitude : 1.49
            },
        {
              country : "Algeria",
              alpha2 : "DZ",
              alpha3 : "DZA",
              numeric : 12,
              latitude : 28,
              longitude : 3
            },
        {
              country : "American Samoa",
              alpha2 : "AS",
              alpha3 : "ASM",
              numeric : 16,
              latitude : -14.3333,
              longitude : -170
            },
    ]
    return{
    props:{
        profile,
        country
        }
    }
}