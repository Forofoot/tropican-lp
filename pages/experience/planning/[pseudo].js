import React, {useState} from 'react'
import { PrismaClient } from '@prisma/client';
import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

const PlanningStyle = styled.section`
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

export default function Map({profile}) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    console.log(new Date())

    const handleSelect = ( ranges ) =>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
    }
  return (
    <PlanningStyle>
        <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
            disabledDates={[]}
        />
    </PlanningStyle>
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