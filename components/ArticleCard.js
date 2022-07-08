import Link from 'next/link'
import Image from 'next/image'

export default function RecipeCard({ article }) {
    const { titleArticle, slug, description, articleCover, articleContent, publicationDate } = article.fields
    return (
        <div className="cardContainer">
            <div className="cover">
                <Image
                    src={'https:' + articleCover.fields.file.url}
                    alt=''
                    height={articleCover.fields.file.details.image.height}
                    width={articleCover.fields.file.details.image.width}
                />
            </div>
            <div className="cardContent">
                <h2>{titleArticle}</h2>
                <p>{publicationDate}</p>
                <p>{description}</p>
                <Link href={'/blog/' + slug}><a>Voir plus</a></Link>
            </div>


        </div>
    )
}