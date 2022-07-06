import React, {useState, useEffect} from 'react'
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/fr';

const PlanningStyle = styled.section`
    padding-top: 50px;
    height: 100vh;
    max-width: 600px;
    margin: auto;
    figure{
        margin-bottom: 15px;
    }
    p{
        color: #000;
    }
    .experienceBlock{
        display: flex;
        flex-direction:column;
        gap: 30px;
        padding-top: 25px;
    }
`

let daysOfYear = [];

export default function Map({profile, date}) {
    
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    
    const handleSelect = ( ranges ) =>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }


    date.experience.forEach(pro => {
        for (let d = pro.start; d <= pro.end; d.setDate(d.getDate() + 1)) {
            daysOfYear.push(new Date(d));
        }
    });
    
    profile.experience.forEach(aa => {
        aa.start = moment(aa.start).format('l')
        aa.end = moment(aa.end).format('l')
    })
  return (
    <PlanningStyle>
        <DateRangePicker
            ranges={[]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            inputRanges={[]}
            disabledDates={daysOfYear}
        />

        <div className='experienceBlock'>
            {profile.experience.map((exp,i) =>(
                <div key={i}>
                    {exp.start == exp.end ? (
                        <h3>Le {exp.end}</h3>
                    ) : (
                        <h3>Du {exp.start} au {exp.end}</h3>
                    )}
                    <p>Expérience avec {exp.grandParent?.firstName || exp.grandChildren?.firstName} à {exp.place}</p>
                </div>
            ))}
        </div>
    </PlanningStyle>
  )
}

export const getServerSideProps = async ({query}) => {
    // Fetch data from external API
    //const cookie = parseCookies(req)
    const prisma = new PrismaClient();
    const currentPseudo = query.pseudo

    const findWhereGrandParent = await prisma.grandparent.findFirst({
        where:{
            pseudo: currentPseudo
        }
    })
    if(findWhereGrandParent){
        const profile = await prisma.grandparent.findFirst({
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
                    place:true,
                    start:true,
                    end:true,
                    grandChildren:{
                        select:{
                            firstName:true
                        }
                    },
                    image:{
                        select:{
                            image: true
                        }
                    }
                }
            }
        }
        })
        const date = await prisma.grandparent.findFirst({
            where:{
                pseudo:currentPseudo
            },
            select:{
                experience:{
                    select:{
                        start:true,
                        end:true,
                    }
                }
            }
        })
        await prisma.$disconnect()
        return{
        props:{
                date,
                profile
            }
        }
    }
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
                    place:true,
                    start:true,
                    end:true,
                    grandParent:{
                        select:{
                            firstName:true
                        }
                    },
                    image:{
                        select:{
                            image: true
                        }
                    }
                }
            }
        }
    })

    const date = await prisma.grandchildren.findFirst({
        where:{
            pseudo:currentPseudo
        },
        select:{
            experience:{
                select:{
                    start:true,
                    end:true,
                }
            }
        }
    })
    
    await prisma.$disconnect()
    return{
        props:{
            date,
            profile
        }
    }
}