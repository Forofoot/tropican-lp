import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import { BsChevronRight } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/fr'

const ArticleCardStyle = styled.div`
.cardContainer{
    border-bottom:solid 1px #212F89;
    margin-bottom: 50px;

    .cover{
        margin-bottom: 16px;
        display: flex;
        justify-content: center;
    }
    .cardContent{
        h2{
            color:#000;
            font-size:20px;
            margin-bottom:8px;
        }
        p{
            margin-bottom:8px;
        }

    .more{
        display:flex;
        justify-content:right;
        color: #000;
        align-items:center;
        margin-bottom:50px;
    }
    }
}
`

export default function ArticleCard({ article }) {
    const { titleArticle, slug, description, articleCover, publicationDate } = article.fields
    return (
        <ArticleCardStyle>
            <div className="cardContainer">
                <div className="cover">
                    <Image
                        src={'https:' + articleCover.fields.file.url}
                        alt= {'couverture article '+titleArticle}
                        height={articleCover.fields.file.details.image.height}
                        width={articleCover.fields.file.details.image.width}
                    />
                </div>
                <div className="cardContent">
                    <h2>{titleArticle}</h2>
                    <p>{moment({publicationDate}).format('DD/MM/Y')}</p>
                    <p>{description}</p>
                    <Link href={'/blog/' + slug}><a className="more">Voir plus <BsChevronRight /></a></Link>
                </div>


            </div>
        </ArticleCardStyle>
    )
}